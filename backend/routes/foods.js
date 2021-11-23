"use strict";

/** Routes for food. */

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const Food = require("../models/food")
const foodNewSchema = require("../schemas/foodNew.json");
const router = express.Router();

/** Adds food to food log {food ->} */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, foodNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const food = await Food.add(req.body);
      return res.status(201).json({ food });
    } catch (err) {
      return next(err);
    }
  });

/** Gets all foods that are in the food log that are associated with that user
 * Returns { foods: [all foods] }
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const foods = await Food.getAll();
    return res.json({ foods });
  } catch (err) {
    return next(err);
  }
})

module.exports = router;