export type t<E, A> = Success<A> | Failure<E>
export type Success<A> = { _tag: "Success"; value: A }
export type Failure<E> = { _tag: "Failure"; cause: E }

/**
 * Constructors
 */
export const success = <A>(v: A): Success<A> => ({ _tag: "Success", value: v })
export const failure = <E>(e: E): Failure<E> => ({ _tag: "Failure", cause: e })

/*/
 * Predicatess
 */
export const isSuccess = <E, A>(v: t<E, A>): v is Success<A> =>
    v._tag === "Success"
export const isFailure = <E, A>(v: t<E, A>): v is Failure<E> =>
    v._tag === "Failure"
