import { flow } from "./Function.js"
import * as Result from "./Result.js"

export interface t<A> {
    (): Promise<A>
    readonly _tag: "Async"
}

/**
 * Constructors
 */
export const fromPromise = <A>(v: (() => Promise<A>) | Promise<A>): t<A> => {
    function fn() {
        if (typeof v === "function") return v()
        return v
    }
    fn._tag = "Async" as const
    return fn
}

const tryAsync = <E, A>(
    v: () => Promise<A>,
    onError: (e: unknown) => E,
): t<Result.t<E, A>> =>
    fromPromise(v().then(Result.of).catch(flow(onError, Result.failure)))
export { tryAsync as try }

/**
 * Applicative
 */
export const of = <A>(v: A): t<A> => fromPromise(Promise.resolve(v))

/**
 * Apply
 */
export const ap =
    <A>(v: t<A>) =>
    <B>(fn: (v: A) => B): t<B> =>
        map(fn)(v)

/*
 * Functor
 */
export const map =
    <A, B>(fn: (v: A) => B) =>
    (v: t<A>): t<B> =>
        fromPromise(v().then(fn))

/**
 * Chain
 */
export const chain =
    <A, B>(fn: (v: A) => t<B>) =>
    (v: t<A>): t<B> =>
        flatten(map(fn)(v))

export const flatten = <A>(v: t<t<A>>): t<A> =>
    fromPromise(v().then(fn => fn()))
