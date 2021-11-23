CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  food_name TEXT NOT NULL NOT NULL,
  serving_quantity NUMERIC,
  serving_unit TEXT,
  serving_weight_grams NUMERIC,
  nf_calories NUMERIC,
  nf_total_fat NUMERIC,
  nf_total_carbohydrate NUMERIC,
  nf_protein NUMERIC,
  thumb TEXT
);

CREATE TABLE user_foods (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  food_id INTEGER
    REFERENCES foods ON DELETE CASCADE,
  PRIMARY KEY (username, food_id)
);