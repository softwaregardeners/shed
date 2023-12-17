export interface t<A> {
    (): Promise<A>
    readonly _tag: "Async"
}

/**
 * Constructors
 */
export const fromPromise = <A>(v: Promise<A>): t<A> => {
    const async = () => v
    async._tag = "Async" as const
    return async
}

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
