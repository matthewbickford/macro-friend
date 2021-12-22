import React from "react";
import { Link } from "react-router-dom";
import "./FoodCard.css";

/** Show limited information about a food
 *
 * Is rendered by FoodList to show a "card" for each item that appears in search.
 *
 * FoodsList -> FoodCard
 */

function FoodCard({ name, thumb, serving_qty, serving_unit }) {
  console.debug("FoodCard");

  return (
      <Link className="FoodCard" to={`/food/${name}`}>
        <div className="card">
          <img src={thumb} alt={name} />
          <div class="container">
            <h4><b>{name}</b></h4>
            <p>{serving_qty} - {serving_unit}</p>
          </div>
        </div>
      </Link>
  );
}

export default FoodCard;