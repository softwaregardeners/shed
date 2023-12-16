import { describe, expect, it } from "vitest"
import * as B from "./Boolean.js"
import { pipe } from "./Function.js"

describe("isTrue", () => {
    it.each([
        [true, true],
        [false, false],
    ] as const)("[%s] returns %s", (input, output) => {
        pipe(input, B.isTrue, expect).to.equal(output)
    })
})

describe("isFalse", () => {
    it.each([
        [true, false],
        [false, true],
    ] as const)("[%s] returns %s", (input, output) => {
        pipe(input, B.isFalse, expect).to.equal(output)
    })
})

describe("not", () => {
    it.each([
        [true, false],
        [false, true],
    ] as const)("[%s] returns %s", (input, output) => {
        pipe(input, B.not, expect).to.equal(output)
    })
})
