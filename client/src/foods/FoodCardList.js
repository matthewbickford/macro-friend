import React from "react";
import FoodCard from "./FoodCard";

/** Show list of food cards.
 *
 * Used by FoodList
 * func prop which will be called by JobCard on apply.
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 */

function FoodCardList({ foods }) {
  console.debug("FopdCardList", "foods=", foods);

  return (
      <div className="FoodCardList">
        {foods.map(food => (
            <FoodCard
                key={food.tag_id}
                id={food.tag_id}
                name={food.food_name}
                serving_unit={food.serving_unit}
                serving_qty={food.serving_qty}
                thumb={food.photo.thumb}
            />
        ))}
      </div>
  );
}

export default FoodCardList;