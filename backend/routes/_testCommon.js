"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Food = require("../models/food")
const { createToken } = require("../helpers/tokens");
const request = require("superagent");


async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM foods")

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });

  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });

  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  await Food.add({
    foodName: 'f1', 
    servingQty: 1, 
    servingUnit: 1, 
    servingWeightGrams: 100, 
    calories: 100, 
    carbs: 10, 
    fat: 10, 
    protein: 10
  });

  await Food.add({
    foodName: 'f2', 
    servingQty: 2, 
    servingUnit: 1, 
    servingWeightGrams: 200, 
    calories: 200, 
    carbs: 20, 
    fat: 20, 
    protein: 20
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.query("DELETE FROM users");
  try {
    await db.end();
    console.log("DB has disconnected")
  } catch(e) {
    console.log("Error during disconnection", e.stack)
  }
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
