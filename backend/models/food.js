"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { response } = require("express");


class Food {

    // Adds food to nutrition log
    static async add(
            {foodName, servingUnit, servingWeightGrams, calories, fat, carbs, protein, thumb}) {
        if (!foodName) throw new BadRequestError("FoodName required")
        const result = await db.query(
            `INSERT INTO foods
                (food_name,
                serving_unit,
                serving_weight_grams,
                nf_calories,
                nf_total_fat,
                nf_total_carbohydrate,
                nf_protein,
                thumb)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING 
                food_name as "foodName",
                serving_unit as "servingUnit",
                serving_weight_grams as "servingWeightGrams",
                nf_calories as "calories",
                nf_total_fat as "fat",
                nf_total_carbohydrate as "carbs",
                nf_protein as "protein",
                thumb`, 
            [foodName, servingUnit, servingWeightGrams, calories, fat, carbs, protein, thumb]);
        const food = result.rows[0];
        return food;
    };

    // Access food from DB by name
    static async get(foodName) {
        const result = await db.query(`
            SELECT 
                food_name as "foodName,
                serving_unit as "servingUnit",
                serving_weight_grams as "servingWeightGrams",
                nf_calories as "calories",
                nf_total_fat as "fat",
                nf_total_carbohydrate, as "carbs",
                nf_protein as "protein",
                thumb
            FROM foods
            WHERE food_name = $1`, [foodName]);
        
        const food = result.rows[0]
        if (!food) throw new NotFoundError(`No results for: ${foodName}`);
        return food;
    };

    // get all foods from DB
    static async getAll() {
        const results = await db.query(`
            SELECT 
                food_name as "foodName",
                serving_unit as "servingUnit",
                serving_weight_grams as "servingWeightGrams",
                nf_calories as "calories",
                nf_total_fat as "fat",
                nf_total_carbohydrate as "carbs",
                nf_protein as "protein",
                thumb
            FROM foods
            ORDER BY food_name`);
        
        return results.rows;
    }


}

module.exports = Food;