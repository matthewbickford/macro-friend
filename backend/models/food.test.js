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
  commonAfterAll
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
        servingUnit: 1, 
        servingWeightGrams: 150, 
        calories: 100, 
        fat: 0, 
        carbs: 25, 
        protein: 0,
        thumb: "thumbnail"
    }
    test("works", async function() {
        let food = await Food.add(newFood);
        expect(food).toEqual(
            {
                foodName: "banana", 
                servingUnit: "1", 
                servingWeightGrams: "150", 
                calories: "100", 
                fat: "0", 
                carbs: "25", 
                protein: "0",
                thumb: "thumbnail"
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

// /************************************** add */

describe("getAll", function() {
    test("works", async function() {
        let foods = await Food.getAll();
        expect(foods).toEqual([
            {
                foodName: "f1", 
                servingUnit: "1", 
                servingWeightGrams: "100", 
                calories: "100", 
                fat: "10", 
                carbs: "10", 
                protein: "10",
                thumb: null
            },
            {
                foodName: "f2", 
                servingUnit: "1", 
                servingWeightGrams: "200", 
                calories: "200", 
                fat: "20", 
                carbs: "20", 
                protein: "20",
                thumb: null
            }
        ]);
    });
});
