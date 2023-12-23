import * as Async from "./Async.js"
import { absurd } from "./Function.js"
import * as Result from "./Result.js"
import * as Sync from "./Sync.js"

export type t<E, A> = Async.t<Result.t<E, A>>

/**
 * Constructors
 */

export const from = <E, A>(
    v: Result.t<E, A> | Sync.t<Result.t<E, A>> | Async.t<Result.t<E, A>>,
): t<E, A> => {
    switch (v._tag) {
        case "Failure":
        case "Success":
            return Async.of(v)
        case "Sync":
            return Async.fromPromise(Promise.resolve().then(v))
        case "Async":
            return v
        default:
            return absurd(v)
    }
}

/**
 * Applicative
 */

export const of = <A>(v: A): t<never, A> => from(Result.success(v))

/**
 * Apply
 */
export const ap =
    <E, A>(v: t<E, A>) =>
    <B>(fn: (v: A) => B): t<E, B> =>
        map(fn)(v)

/**
 * Functor
 */
export const map =
    <A, B>(fn: (v: A) => B) =>
    <E>(v: t<E, A>): t<E, B> =>
        Async.map(Result.map(fn))(v)

/**
 * Chain
 */
export const chain =
    <F, A, B>(
        fn: (v: A) => Result.t<F, B> | Sync.t<Result.t<F, B>> | t<F, B>,
    ) =>
    <E>(v: t<E, A>): t<E | F, B> =>
        Async.fromPromise(async () => {
            const mapped = map(fn)(v)
            const value = await mapped()
            if (Result.isFailure(value)) return value
            const success = value.value
            return from(success)()
        })
export const flatten = <E, F, A>(v: t<F, t<E, A>>): t<E | F, A> =>
    Async.fromPromise(async () => {
        const result = await v()
        if (Result.isFailure(result)) return result
        return result.value()
    })
