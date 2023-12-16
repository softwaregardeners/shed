import { assert, describe, it } from "vitest"
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
