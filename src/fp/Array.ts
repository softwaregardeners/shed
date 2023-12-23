import * as Maybe from "./Maybe.js"
import * as Predicate from "./Predicate.js"
import * as Transformer from "./Transformer.js"
type t<A> = readonly A[]

/**
 * Constructors
 */
export const from = <A>(v: A[]): t<A> => v

/**
 * Applicative
 */
export const of = <A>(v: A): t<A> => [v]

/**
 * Apply
 */
export const ap =
    <A>(v: t<A>) =>
    <B>(fn: Transformer.t<A, B>): t<B> =>
        map(fn)(v)

/**
 * Functor
 */
export const map =
    <A, B>(fn: Transformer.t<A, B>) =>
    (v: t<A>): t<B> =>
        v.map(fn)

export const chain =
    <A, B>(fn: Transformer.t<A, t<B>>) =>
    (v: t<A>): t<B> =>
        v.flatMap(fn)

export const compact = <A>(v: t<Maybe.t<A>>): t<A> =>
    v.filter(Maybe.isJust).map(item => item.value)

export const flatten = <A>(v: t<t<A>>): t<A> => v.flat()

export const filter =
    <A>(fn: Predicate.t<A>) =>
    (v: t<A>) =>
        v.filter(fn)

export const filterMap =
    <A, B>(fn: Transformer.t<A, Maybe.t<B>>) =>
    (v: t<A>) =>
        compact(v.map(fn))
