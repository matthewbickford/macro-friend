"use strict";

/** Routes for food/item searches. */
const {X_APP_ID, X_APP_KEY} = require("../config")

const axios = require("axios");
const express = require("express");
const router = express.Router();

let config = {
    headers: {
        'x-app-id': X_APP_ID,
        'x-app-key': X_APP_KEY,
        'x-remote-user-id': '0'
    }
  }

router.get("/:food", async function (req, res, next) {
    try {
        const food = req.params.food;
        let data = {'query': food}
        let result = await axios.post(
            "https://trackapi.nutritionix.com/v2/natural/nutrients", 
            data,
            config )
        res.json(result.data);
    } catch (err) {
        return next(err)
    }
});

module.exports = router;