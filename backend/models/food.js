"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { response } = require("express");
const { remove } = require("./user");


class Food {

    // Adds food to db
    static async add(
            {foodName, servingQty, servingUnit, servingWeightGrams, calories, fat, carbs, protein, thumb, username }) {
        if (!foodName) throw new BadRequestError("FoodName required")
        const result = await db.query(
            `INSERT INTO foods
                (food_name,
                serving_quantity,
                serving_unit,
                serving_weight_grams,
                nf_calories,
                nf_total_fat,
                nf_total_carbohydrate,
                nf_protein,
                thumb,
                username)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING
                id,
                food_name as "foodName",
                serving_quantity as "servingQty",
                serving_unit as "servingUnit",
                serving_weight_grams as "servingWeightGrams",
                nf_calories as "calories",
                nf_total_fat as "fat",
                nf_total_carbohydrate as "carbs",
                nf_protein as "protein",
                thumb,
                username`, 
            [foodName, servingQty, servingUnit, servingWeightGrams, calories, fat, carbs, protein, thumb, username]);
        const food = result.rows[0];
        return food;
    };

    // Access food from DB by name
    static async get(foodName) {
        const result = await db.query(`
            SELECT
                id,
                food_name as "foodName",
                serving_quantity as "servingQty",
                serving_unit as "servingUnit",
                serving_weight_grams as "servingWeightGrams",
                nf_calories as "calories",
                nf_total_fat as "fat",
                nf_total_carbohydrate as "carbs",
                nf_protein as "protein",
                thumb,
                username
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
                id,
                food_name as "foodName",
                serving_quantity as "servingQty",
                serving_unit as "servingUnit",
                serving_weight_grams as "servingWeightGrams",
                nf_calories as "calories",
                nf_total_fat as "fat",
                nf_total_carbohydrate as "carbs",
                nf_protein as "protein",
                thumb,
                username
            FROM foods
            ORDER BY food_name`);
        
        return results.rows;
    }

    // get total macros from DB asociated with a user
    static async getMacros(username) {
        const macros = await db.query(`
            SELECT 
                SUM(nf_calories) as "calories",
                SUM(nf_total_fat) as "fat",
                SUM(nf_total_carbohydrate) as "carbs",
                SUM(nf_protein) as "protein"
            FROM foods
            WHERE username = $1`, [username]);
        if (!macros) throw new NotFoundError (`No user with username: ${username} found`)
        return macros.rows[0];
    }

    /** Remove item from DB,
     * Check if food with id is presnet and throw error
     * Else, delete food from DB with id
    */
    static async remove(id) {
        const preCheckResult = await db.query(`
        SELECT 
        FROM foods
        WHERE id = $1`, [id]);
        const preCheck = preCheckResult.rows[0];
        if (!preCheck) throw new NotFoundError(`No food with id of ${id}`)

        await db.query(`
            DELETE 
            FROM foods
            WHERE id = $1`, [id]);
    };

    static async reset(username) {

        const foods = await db.query(`
        SELECT *
        FROM foods
        WHERE username = $1`, username)

    //     await db.query(`
    //         DELETE *
    //         FROM foods
    //         WHERE username = $1`, [username])
    // }

    return foods.rows[0];

    }

}

module.exports = Food;