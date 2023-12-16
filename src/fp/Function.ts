/**
 * utilities on Functions
 * This heavily borrows from [fp-ts](https://github.com/fp-ts/core/blob/main/src/Function.ts)
 */

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const isFunction = (input: unknown): input is Function =>
    typeof input === "function"

export const apply =
    <A>(a: A) =>
    <B>(self: (a: A) => B): B =>
        self(a)

export const identity = <A>(a: A): A => a

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const unsafeCoerce: <A, B>(a: A) => B = identity as any

export const constTrue: () => true = () => true
export const constFalse: () => false = () => false
export const constNull: () => null = () => null
export const constUndefined: () => undefined = () => undefined
export const constVoid: () => void = () => undefined

export const dual = <
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    DataLast extends (...args: Array<any>) => any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    DataFirst extends (...args: Array<any>) => any,
>(
    arity: Parameters<DataFirst>["length"],
    body: DataFirst,
): DataLast & DataFirst => {
    // @ts-expect-error
    return function () {
        // biome-ignore lint/style/noArguments: <explanation>
        if (arguments.length >= arity) {
            // @ts-expect-error
            // biome-ignore lint/style/noArguments: <explanation>
            return body.apply(this, arguments)
        }
        // biome-ignore lint/style/noArguments: <explanation>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        return ((self: any) => body(self, ...arguments)) as any
    }
}

export const flip =
    <A extends Array<unknown>, B extends Array<unknown>, C>(
        f: (...a: A) => (...b: B) => C,
    ): ((...b: B) => (...a: A) => C) =>
    (...b) =>
    (...a) =>
        f(...a)(...b)

export function flow<A extends ReadonlyArray<unknown>, B>(
    ab: (...a: A) => B,
): (...a: A) => B
export function flow<A extends ReadonlyArray<unknown>, B, C>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
): (...a: A) => C
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
): (...a: A) => D
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
): (...a: A) => E
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
): (...a: A) => F
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
): (...a: A) => G
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
): (...a: A) => H
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
): (...a: A) => I
export function flow<
    A extends ReadonlyArray<unknown>,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
): (...a: A) => J
export function flow(
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    ab: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    bc?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    cd?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    de?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    ef?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    fg?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    gh?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    hi?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    ij?: Function,
): unknown {
    // biome-ignore lint/style/noArguments: <explanation>
    switch (arguments.length) {
        case 1:
            return ab
        case 2:
            return function (this: unknown) {
                // biome-ignore lint/style/noArguments: <explanation>
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                return bc!(ab.apply(this, arguments))
            }
        case 3:
            return function (this: unknown) {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                // biome-ignore lint/style/noArguments: <explanation>
                return cd!(bc!(ab.apply(this, arguments)))
            }
        case 4:
            return function (this: unknown) {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                // biome-ignore lint/style/noArguments: <explanation>
                return de!(cd!(bc!(ab.apply(this, arguments))))
            }
        case 5:
            return function (this: unknown) {
                // biome-ignore lint/style/noArguments: <explanation>
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                return ef!(de!(cd!(bc!(ab.apply(this, arguments)))))
            }
        case 6:
            return function (this: unknown) {
                // biome-ignore lint/style/noArguments: <explanation>
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                return fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))
            }
        case 7:
            return function (this: unknown) {
                // biome-ignore lint/style/noArguments: <explanation>
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                return gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))
            }
        case 8:
            return function (this: unknown) {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                return hi!(
                    // biome-ignore lint/style/noArguments: <explanation>
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))),
                )
            }
        case 9:
            return function (this: unknown) {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                return ij!(
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    hi!(
                        // biome-ignore lint/style/noArguments: <explanation>
                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))),
                    ),
                )
            }
    }
    return
}

export const compose: {
    <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C
    // biome-ignore lint/suspicious/noRedeclare: <explanation>
    <A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C
} = dual(2, <A, B, C>(ab: (a: A) => B, bc: (b: B) => C): ((a: A) => C) =>
    flow(ab, bc),
)

export const absurd = <A>(_: never): A => {
    throw new Error("Called `absurd` function which should be uncallable")
}

export const tupled =
    <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): ((a: A) => B) =>
    a =>
        f(...a)
export const untupled =
    <A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): ((...a: A) => B) =>
    (...a) =>
        f(a)

export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
): D
export function pipe<A, B, C, D, E>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
): E
export function pipe<A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
): F
export function pipe<A, B, C, D, E, F, G>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
): G
export function pipe<A, B, C, D, E, F, G, H>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
): O

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
): P

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
): Q

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
): R

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S,
): S

export function pipe<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S,
    st: (s: S) => T,
): T
export function pipe(
    a: unknown,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    ab?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    bc?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    cd?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    de?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    ef?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    fg?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    gh?: Function,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    hi?: Function,
): unknown {
    // biome-ignore lint/style/noArguments: <explanation>
    switch (arguments.length) {
        case 1:
            return a
        case 2:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return ab!(a)
        case 3:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return bc!(ab!(a))
        case 4:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return cd!(bc!(ab!(a)))
        case 5:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return de!(cd!(bc!(ab!(a))))
        case 6:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return ef!(de!(cd!(bc!(ab!(a)))))
        case 7:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return fg!(ef!(de!(cd!(bc!(ab!(a))))))
        case 8:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
        case 9:
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
        default: {
            // biome-ignore lint/style/noArguments: <explanation>
            let ret = arguments[0]
            // biome-ignore lint/style/noArguments: <explanation>
            for (let i = 1; i < arguments.length; i++) {
                // biome-ignore lint/style/noArguments: <explanation>
                ret = arguments[i](ret)
            }
            return ret
        }
    }
}

export const hole: <T>() => T = unsafeCoerce(absurd)
export const skip = <A, B>(_: A, b: B): B => b
