export interface t<A> {
    (): A
    readonly _tag: "Sync"
}

/**
 * Constructors
 */
export const from = <A>(fn: () => A): t<A> => {
    const sync = () => fn
    sync._tag = "Sync" as const
    return sync as t<A>
}

/**
 * Applicative
 */
export const of = <A>(v: A): t<A> => from(() => v)

/**
 * Apply
 */
export const ap =
    <A>(v: t<A>) =>
    <B>(fn: (v: A) => B): t<B> =>
        map(fn)(v)

/**
 * Functor
 */
export const map =
    <A, B>(fn: (v: A) => B) =>
    (v: t<A>): t<B> =>
        of(fn(v()))

/**
 * Chain
 */
export const chain =
    <A, B>(fn: (v: A) => t<B>) =>
    (v: t<A>): t<B> =>
        fn(v())

export const flatten = <A>(v: t<t<A>>): t<A> => v()
