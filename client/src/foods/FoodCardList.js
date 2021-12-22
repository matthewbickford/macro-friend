import React from "react";
import FoodCard from "./FoodCard";
import "./FoodCard.css";

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
        <ul className="wrapper">
        {foods.map(food => (
          <li>
              <FoodCard
                key={food.tag_id}
                id={food.tag_id}
                name={food.food_name}
                serving_unit={food.serving_unit}
                serving_qty={food.serving_qty}
                thumb={food.photo.thumb}
            />
          </li>
        ))}
        </ul>

      </div>
  );
}

export default FoodCardList;