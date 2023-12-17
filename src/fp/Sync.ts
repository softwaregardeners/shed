export interface t<A> {
    (): A
    readonly _tag: "Sync"
}

/**
 * Applicative
 */
export const of = <A>(v: A): t<A> => {
    const sync = () => v
    sync._tag = "Sync" as const
    return sync
}

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
