import { describe, expect, it } from "vitest"
import * as Async from "./Async.js"

describe("Constructors", () => {
    describe("fromPromise", () => {
        it("returns a function that returns the promise", async () => {
            const promise = Promise.resolve(42)
            const async = Async.fromPromise(promise)
            const actual = await async()
            expect(actual).to.equal(42)
        })
    })
})

describe("applicative", () => {
    describe("of", () => {
        it("returns a function that returns a promise that resolves to the value", async () => {
            const async = Async.of(42)
            expect(await async()).to.equal(42)
        })
    })
})
