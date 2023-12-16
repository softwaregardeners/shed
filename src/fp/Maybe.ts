export type t<A> = Just<A> | Nothing

export type Just<A> = { readonly _tag: "Just"; readonly value: A }
export type Nothing = { readonly _tag: "Nothing" }

/*
 * Guards
 */
export const isJust = <A>(v: t<A>): v is Just<A> => v._tag === "Just"
export const isNothing = <A>(v: t<A>): v is Nothing => v._tag === "Nothing"

/**
 * Constructors
 */
export const just = <A>(v: A): Just<A> => ({ _tag: "Just", value: v })
export const nothing: Nothing = { _tag: "Nothing" }
export const fromNullable = <A>(v: A | null | undefined): t<A> => {
    const b = v ?? null
    return b === null ? nothing : of(b)
}
export const from = fromNullable

/*
 * Destructors
 */
export const toNullable = <A>(v: t<A>): A | null => (isJust(v) ? v.value : null)
export const toUndefined = <A>(v: t<A>): A | undefined =>
    isJust(v) ? v.value : undefined
export const to = toNullable

/*
 * Applicative
 */
export const of: <A>(v: A) => t<A> = just

/*
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
        isJust(v) ? of(fn(v.value)) : nothing

/*
 * Chain
 */
export const chain =
    <A, B>(fn: (v: A) => t<B>) =>
    (v: t<A>): t<B> =>
        flatten(map(fn)(v))

export const flatten = <A>(v: t<t<A>>): t<A> => (isJust(v) ? v.value : nothing)
