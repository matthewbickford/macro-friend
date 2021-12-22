"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const db = require("../db.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testFoodIds
} = require("./_testCommon");

const { TestWatcher } = require("@jest/core");
const Food = require("./food");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// /************************************** add */

describe("add", function() {
    const newFood = {
        foodName: "banana", 
        servingQty: 1, 
        servingUnit: 1, 
        servingWeightGrams: 150, 
        calories: 100, 
        fat: 0, 
        carbs: 25, 
        protein: 0,
        thumb: "thumbnail",
        username: "u1"
    }
    test("works", async function() {
        let food = await Food.add(newFood);
        expect(food).toEqual(
            {
                id: expect.any(Number),
                foodName: "banana", 
                servingQty: "1", 
                servingUnit: "1", 
                servingWeightGrams: "150", 
                calories: "100", 
                fat: "0", 
                carbs: "25", 
                protein: "0",
                thumb: "thumbnail",
                username: "u1"
            }
        );
    });
    test("bad request if missing data", async function() {
        let newFood = {
            servingUnit: 1, 
            servingWeightGrams: 150, 
        }
        try {
            let food = await Food.add(newFood);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

// /************************************** get*/

describe("get", function() {
    test("works with correct data", async function() {
        let food = await Food.get('f1');
        expect(food).toEqual({
                id: expect.any(Number),
                foodName: "f1",
                servingQty: "1", 
                servingUnit: "1", 
                servingWeightGrams: "100", 
                calories: "100", 
                fat: "10", 
                carbs: "10", 
                protein: "10",
                thumb: null,
                username: "u1"
            })
    })
    test("notFoundError with bad input", async function() {
        try {
            let food = await Food.get("wrong");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    })
})

// /************************************** getAll*/

describe("getAll", function() {
    test("works", async function() {
        let foods = await Food.getAll();
        expect(foods).toEqual([
            {
                id: expect.any(Number),
                foodName: "f1",
                servingQty: "1", 
                servingUnit: "1", 
                servingWeightGrams: "100", 
                calories: "100", 
                fat: "10", 
                carbs: "10", 
                protein: "10",
                thumb: null,
                username: "u1"
            },
            {
                id: expect.any(Number),
                foodName: "f2", 
                servingQty: "1", 
                servingUnit: "1", 
                servingWeightGrams: "200", 
                calories: "200", 
                fat: "20", 
                carbs: "20", 
                protein: "20",
                thumb: null,
                username: "u2"
            }
        ]);
    });
});

// /************************************** getMacros */

describe("Get Macros", function() {
    test("works", async function() {
        let macros = await Food.getMacros("u1");
        expect(macros).toEqual(
            { 
            calories: '100', 
            fat: '10', 
            carbs: '10', 
            protein: '10'
        });
    });
})

describe("Remove", function() {

    test("works", async function() {
        let foods = await Food.getAll();
        let result = await Food.remove("1");
        const res = await db.query(
            "SELECT * FROM foods WHERE id=1");
        expect(res.rows.length).toEqual(0);
    });

    test("Not found error if id not found", async function() {
        try {
            let food = await Food.remove(-1);
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    })
})
