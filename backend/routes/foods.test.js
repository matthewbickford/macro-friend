"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const Food = require("../models/food")
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /foods */

describe("POST /foods", function () {
    test("works create new food", async function () {
      const resp = await request(app)
          .post("/foods")
          .send({
            foodName: "banana", 
            servingQty: 1, 
            servingUnit: "1", 
            servingWeightGrams: 150, 
            calories: 100, 
            fat: 0, 
            carbs: 25, 
            protein: 0,
            thumb: "thumbnail",
            username: "u1"
  }).set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({
        food: {
          "id": expect.any(Number),
          "foodName": "banana",
          "servingQty": "1",
          "servingUnit": "1",
          "servingWeightGrams": "150",
          "calories": "100",
          "fat": '0',
          "carbs": "25",
          "protein": "0",
          "thumb": "thumbnail",
          "username": "u1"
        }
      });
    });
  
    test("unauth for anon", async function () {
      const resp = await request(app)
          .post("/foods")
          .send({
            foodName: "banana", 
            servingQty: 1, 
            servingUnit: "1", 
            servingWeightGrams: 150, 
            calories: 100, 
            fats: 0, 
            carbs: 25, 
            protein: 0,
            thumb: "thumbnail"
          });
      expect(resp.statusCode).toEqual(401);
    });
  
    test("bad request if missing data", async function () {
      const resp = await request(app)
          .post("/foods")
          .send({
            servingQty: 1, 
            servingUnit: "1", 
            servingWeightGrams: 150, 
            calories: 100, 
            fats: 0, 
            carbs: 25, 
            protein: 0,
            thumb: "thumbnail"
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(400);
    });
  
    test("bad request if invalid data", async function () {
      const resp = await request(app)
          .post("/foods")
          .send({
            foodName: 7, 
            servingQty: 1, 
            servingUnit: "1", 
            servingWeightGrams: 150, 
            calories: 100, 
            fats: 0, 
            carbs: 25, 
            protein: 0,
            thumb: "thumbnail"
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(400);
    });
});

/************************************** GET /foods */

describe("GET /foods", function() {
  test("works", async function() {
    const resp = await request(app)
    .get("/foods")
    .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      foods: [
        {
          id: expect.any(Number),
          foodName: 'f1',
          servingQty: '1',
          servingUnit: '1',
          servingWeightGrams: '100',
          calories: '100',
          fat: '10',
          carbs: '10',
          protein: '10',
          thumb: null,
          username: "u1"
        },
        {
          id: expect.any(Number),
          foodName: 'f2',
          servingQty: '2',
          servingUnit: '1',
          servingWeightGrams: '200',
          calories: '200',
          fat: '20',
          carbs: '20',
          protein: '20',
          thumb: null,
          username: "u1"
        }
      ]
    });
  }); 
});


/************************************** DELETE /foods/:id */

describe("Delete /foods/:id", function() {
  test("works", async function() {
    let result = await request(app)
    .delete('/foods/1')
    .set("authorization", `Bearer ${u1Token}`);
    expect(result.statusCode).toEqual(200);
  });

  test("Does not work with bad id", async function() {
    let result = await request(app)
    .delete('/foods/666')
    .set("authorization", `Bearer ${u1Token}`);
    expect(result.statusCode).toEqual(404);
  });
});