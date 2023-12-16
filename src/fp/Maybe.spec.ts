import { assert, describe, expect, it } from "vitest"
import * as B from "./Boolean.js"
import { pipe } from "./Function.js"
import * as Maybe from "./Maybe.js"

describe("nothing", () => {
    it("is not a Just", () => pipe(Maybe.nothing, Maybe.isJust, B.not, assert))
    it("is a Nothing", () => pipe(Maybe.nothing, Maybe.isNothing, assert))
})

describe("just", () => {
    it("returns a Just", () => pipe(Maybe.just(42), Maybe.isJust, assert))
    it("does not return a Nothing", () =>
        pipe(Maybe.just(42), Maybe.isNothing, B.not, assert))
})
describe("fromNullable", () => {
    describe.each([[undefined], [null]] as const)("[%s]", value => {
        it("returns a nothing", () => {
            pipe(value, Maybe.fromNullable, Maybe.isNothing, assert)
        })
    })
})

describe("toNullable", () => {
    describe("on a just", () => {
        it("returns the wrapped value", () =>
            pipe(Maybe.just(42), Maybe.toNullable, expect).to.equal(42))
    })
    describe("on a nothing", () => {
        it("returns null", () =>
            pipe(Maybe.nothing, Maybe.toNullable, expect).to.be.null)
    })
})

describe("toUndefined", () => {
    describe("on a just", () => {
        it("returns the wrapped value", () =>
            pipe(Maybe.just(42), Maybe.toUndefined, expect).to.equal(42))
    })
    describe("on a nothing", () => {
        it("returns undefined", () =>
            pipe(Maybe.nothing, Maybe.toUndefined, expect).to.be.undefined)
    })
})

describe("Applicative", () => {
    it("returns a Just", () => pipe(Maybe.of(42), Maybe.isJust, assert))
    it("does not return a Nothing", () =>
        pipe(Maybe.of(42), Maybe.isNothing, B.not, assert))
})
