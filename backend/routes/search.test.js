"use strict";

const { TestWatcher } = require("@jest/core");
const request = require("supertest");
const app = require("../app");
const { ExpressError } = require("../expressError");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/token */

describe("GET search/items/:food", function () {
    test("works", async function() {
        let response = await request(app)
            .get("/search/items/apple");
        expect(response.statusCode).toEqual(201);
    });
});

describe("GET search/nutrition/:food", function () {
    test("works", async function() {
        let response = await request(app)
            .get("/search/nutrition/apple");
        expect(response.statusCode).toEqual(201);
    })
});