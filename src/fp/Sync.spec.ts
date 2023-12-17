import { describe, expect, it } from "vitest"
import { apply, pipe } from "./Function.js"
import * as Sync from "./Sync.js"

describe("Applicative", () => {
    describe("of", () => {
        it("returns something that return the value when called", () => {
            pipe(42, Sync.of, apply(void undefined), expect).to.equal(42)
        })
    })
})
