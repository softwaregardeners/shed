import * as Async from "./Async.js"
import { flow, pipe } from "./Function.js"
import * as Result from "./Result.js"
import * as Sync from "./Sync.js"

export interface t<R, E, A> {
    (r: R): Async.t<Result.t<E, A>>
    readonly _tag: "Unit"
}

/**
 * Constructors
 */

const fromAsyncResult = <E, A, R = unknown>(
    a: Async.t<Result.t<E, A>>,
): t<R, E, A> => {
    const unit = (r: R) => a
    unit._tag = "Unit" as const
    return unit
}

export const from = <E, A>(
    v: Result.t<E, A> | Sync.t<Result.t<E, A>> | Async.t<Result.t<E, A>>,
): t<unknown, E, A> => {
    switch (v._tag) {
        case "Failure":
        case "Success":
            return fromAsyncResult(Async.of(v))
        case "Async":
            return fromAsyncResult(v)
        case "Sync":
            return fromAsyncResult(Async.fromPromise(Promise.resolve().then(v)))
    }
}

export const tryCatch = <E, A>(
    async: () => Promise<A>,
    onError: (error: unknown) => E,
): t<never, E, A> => {
    const unit = () =>
        pipe(
            async().then(Result.success).catch(flow(onError, Result.failure)),
            Async.fromPromise,
        )
    unit._tag = "Unit" as const
    return unit
}

/**
 * Applicative
 */

export const of = <A>(v: A): t<unknown, never, A> => from(Result.success(v))

/**
 * Apply
 */
export const ap =
    <R, E, A>(v: t<R, E, A>) =>
    <B>(fn: (v: A) => B): t<R, E, B> =>
        map(fn)(v)

/**
 * Functor
 */
export const map =
    <A, B>(fn: (v: A) => B) =>
    <R, E>(v: t<R, E, A>): t<R, E, B> => {
        const unit = (r: R) => pipe(v(r), Async.map(Result.map(fn)))
        unit._tag = "Unit" as const
        return unit
    }
/**
 * Chain
 */
export function chain<R, F, A, B>(
    fn: (
        v: A,
    ) =>
        | Result.t<F, B>
        | Sync.t<Result.t<F, B>>
        | Async.t<Result.t<F, B>>
        | t<R, F, B>,
): <E>(v: t<R, E, A>) => t<R, E | F, B> {
    return <E>(v: t<R, E, A>): t<R, E | F, B> => {
        const unit = (r: R) =>
            pipe(
                v(r),
                Async.chain((result): Async.t<Result.t<E | F, B>> => {
                    if (Result.isFailure(result)) return Async.of(result)
                    const mapped = fn(result.value)
                    switch (mapped._tag) {
                        case "Failure":
                        case "Success":
                            return Async.of(mapped)
                        case "Async":
                            return mapped
                        case "Sync":
                            return Async.of(mapped())
                        case "Unit":
                            return mapped(r)
                    }
                }),
            )
        unit._tag = "Unit" as const
        return unit
    }
}
