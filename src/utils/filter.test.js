import { describe, test } from "vitest"
import assert from "assert"

import { CONDITIONS, filter, and, or } from "./filter"

describe("Filter", async () => {
  describe("Conditions", async () => {
    test("EQUAL", async () => {
      assert(filter(CONDITIONS.EQUAL, "prop", 1)({ prop: 1 }))
      assert(!filter(CONDITIONS.EQUAL, "prop", 1)({ prop: 2 }))
    })
    test("NOT_EQUAL", async () => {
      assert(filter(CONDITIONS.NOT_EQUAL, "prop", 1)({ prop: 2 }))
      assert(!filter(CONDITIONS.NOT_EQUAL, "prop", 1)({ prop: 1 }))
    })
    test("INCLUDES", async () => {
      assert(filter(CONDITIONS.INCLUDES, "prop", "2")({ prop: "123" }))
      assert(!filter(CONDITIONS.INCLUDES, "prop", "2")({ prop: "456" }))
    })
    test("LESS_THAN", async () => {
      assert(filter(CONDITIONS.LESS_THAN, "prop", 1)({ prop: 0.5 }))
      assert(!filter(CONDITIONS.LESS_THAN, "prop", 1)({ prop: 2 }))
    })
    test("MORE_THAN", async () => {
      assert(filter(CONDITIONS.MORE_THAN, "prop", 1)({ prop: 2 }))
      assert(!filter(CONDITIONS.MORE_THAN, "prop", 1)({ prop: 0.5 }))
    })
    test("ENUM", async () => {
      assert(filter(CONDITIONS.ENUM, "prop", ["A", "B"])({ prop: "B" }))
      assert(!filter(CONDITIONS.ENUM, "prop", ["A", "B"])({ prop: "C" }))
    })
  })

  describe("Queries", async () => {
    const isTrue = filter(CONDITIONS.EQUAL, "prop", true)
    const isTest = filter(CONDITIONS.EQUAL, "prop2", "test")
    test("and", async () => {
      const obj = { prop: true, prop2: "test" }
      assert(and(isTrue, isTest)(obj))
    })
    test("or", async () => {
      const obj = { prop: false, prop2: "test" }
      assert(or(isTrue, isTest)(obj))
    })
  })

  describe("Array filtering", async () => {
    const isTrue = filter(CONDITIONS.EQUAL, "prop", true)
    const isTest = filter(CONDITIONS.EQUAL, "prop2", "test")
    test("and", async () => {
      const query = and(isTrue, isTest)
      const obj1 = { prop: true, prop2: "test" }
      const obj2 = { prop: false, prop2: "test" }
      const result = [obj1, obj2].filter(query)
      assert(result.length === 1)
    })
    test("or", async () => {
      const query = or(isTrue, isTest)
      const obj1 = { prop: true, prop2: "test" }
      const obj2 = { prop: false, prop2: "test" }
      const result = [obj1, obj2].filter(query)
      assert(result.length === 2)
    })
    test("nested", async () => {
      const query = or(and(isTrue, isTest))
      const obj1 = { prop: true, prop2: "test" }
      const obj2 = { prop: false, prop2: "test" }
      const result = [obj1, obj2].filter(query)
      assert(result.length === 1)
    })
  })
})
