import { assert, describe, expect, it } from "vitest"
import { pipe } from "./Function.js"
import * as Result from "./Result.js"

describe("Constructors + Predicates", () => {
    describe("success", () => {
        it("wraps the value in a Success", () => {
            const actual = Result.success(42)
            assert(Result.isSuccess(actual), "is NOT a Success")
            assert(!Result.isFailure(actual), "IS a Failure")
            assert(actual.value === 42, "value NOT wrapped as expected")
        })
    })

    describe("failure", () => {
        it("wraps the cause in a Failure", () => {
            const actual = Result.failure(42)
            assert(!Result.isSuccess(actual), "IS a Success")
            assert(Result.isFailure(actual), "is NOT a Failure")
            assert(actual.cause === 42, "value NOT wrapped as expected")
        })
    })
})

describe("Destructors", () => {
    describe("extract", () => {
        it.each([
            ["[success] returns the value", Result.success(42), 42],
            ["[failure] returns the cause", Result.failure(42), 42],
        ] as const)("%s", (_, input, expected) => {
            pipe(input, Result.extract, expect).to.equal(expected)
        })
    })
})

describe("Applicative", () => {
    describe("of", () => {
        it("returns a success", () => {
            const v = Result.of(42)
            assert(Result.isSuccess(v), "is NOT a Success")
            assert(!Result.isFailure(v), "IS a Failure")
        })
    })
})
