/*
 * Predicates
 */
export const isTrue = (v: boolean): v is true => v === true
export const isFalse = (v: boolean): v is false => v === false

/*
 * Combinators
 */
export const not = (v: boolean): boolean => !v
