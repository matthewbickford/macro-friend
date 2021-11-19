"use strict";

/** Routes for food/item searches. */

const {X_APP_ID, X_APP_KEY} = require("../config")

const axios = require("axios");
const express = require("express");
const router = express.Router();

const headers = {
    headers: {
        'x-app-id': X_APP_ID,
        'x-app-key': X_APP_KEY,
        'x-remote-user-id': '0'
    }
};

// Retreives nutritional information for food items once the name is known

router.get("/nutrition/:food", async function (req, res, next) {
    try {
        const food = req.params.food;
        let data = {'query': food}
        let result = await axios.post(
            "https://trackapi.nutritionix.com/v2/natural/nutrients", 
            data,
            headers )
        return res.status(201).json(result.data);
    } catch (err) {
        return next(err)
    }
});

// Retreives a list of good items based on search term

router.get("/items/:term", async function (req, res, next) {
    try {
        const term = req.params.term;
        let result = await axios.get(
            `https://trackapi.nutritionix.com/v2/search/instant?query=%22${term}%22`,
            headers )
        return res.status(201).json(result.data.common);
    } catch (err) {
        return next(err)
    }
});


module.exports = router;