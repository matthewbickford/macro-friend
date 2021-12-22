const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testFoodIds = [];

async function commonBeforeAll() {

  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM foods");
  await db.query("DELETE FROM user_foods");

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  const foodResults = await db.query(`
      INSERT INTO foods (food_name,
                        serving_quantity,
                        serving_unit,
                        serving_weight_grams,
                        nf_calories,
                        nf_total_fat,
                        nf_total_carbohydrate,
                        nf_protein, 
                        username)
      VALUES ('f1', 1, 1, 100, 100, 10, 10, 10, 'u1'),
             ('f2', 1, 1, 200, 200, 20, 20, 20, 'u2')
      RETURNING id`);
      testFoodIds.splice(0, 0, ...foodResults.rows.map(r => r.id));

  await db.query(`
    INSERT INTO user_foods(username, food_id)
    VALUES ('u1', $1)`, [testFoodIds[0]]);

};

async function commonBeforeEach() {
  await db.query("BEGIN");
};

async function commonAfterEach() {
  await db.query("ROLLBACK");
};

async function commonAfterAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM foods");
  await db.query("DELETE FROM user_foods");
  await db.query("ALTER SEQUENCE foods_id_seq RESTART WITH 1")
  await db.end();
};


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll, 
  testFoodIds
};