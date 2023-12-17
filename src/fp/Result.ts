import * as Maybe from "./Maybe.js"

export type t<E, A> = Success<A> | Failure<E>
export type Success<A> = { _tag: "Success"; value: A }
export type Failure<E> = { _tag: "Failure"; cause: E }

/*/
 * Predicatess
 */
export const isSuccess = <E, A>(v: t<E, A>): v is Success<A> =>
    v._tag === "Success"
export const isFailure = <E, A>(v: t<E, A>): v is Failure<E> =>
    v._tag === "Failure"

/**
 * Constructors
 */
export const success = <A>(v: A): t<never, A> => ({ _tag: "Success", value: v })
export const failure = <E>(e: E): t<E, never> => ({ _tag: "Failure", cause: e })

export const fromMaybe =
    <E>(onNothing: () => E) =>
    <A>(v: Maybe.t<A>) =>
        Maybe.isJust(v) ? success(v.value) : failure(onNothing())

/**
 * Destructors
 */
export function extract<A>(v: Success<A>): A
export function extract<E>(v: Failure<E>): E
export function extract<E, A>(v: t<E, A>): A | E
// This is duplicated because TS exports all declaration BUT the last one
export function extract<E, A>(v: t<E, A>): A | E {
    return isSuccess(v) ? v.value : v.cause
}

/**
 * Applicative
 */
export const of: <A>(v: A) => t<never, A> = success

/**
 * Apply
 */
export const ap =
    <E, A>(v: t<E, A>) =>
    <B>(fn: (v: A) => B) =>
        map(fn)(v)

/**
 * Functor
 */
export const map =
    <A, B>(fn: (a: A) => B) =>
    <E>(v: t<E, A>): t<E, B> =>
        isSuccess(v) ? success(fn(v.value)) : failure(v.cause)
/**
 * Chain
 */
export const chain =
    <F, A, B>(fn: (v: A) => t<F, B>) =>
    <E>(v: t<E, A>): t<E | F, B> =>
        flatten(map(fn)(v))

export const flatten = <E, F, A>(v: t<F, t<E, A>>): t<E | F, A> =>
    isSuccess(v) ? v.value : failure(v.cause)
