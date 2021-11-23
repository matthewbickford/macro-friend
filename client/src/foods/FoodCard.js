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
      <Link className="FoodCard card" to={`/food/${name}`}>
        <div className="card-body">
          <h6 className="card-title">{name}</h6>
          <p>{serving_qty} {serving_unit}</p>
          <img src={thumb}
                alt={name}
                className="float-right ml-5" />
        </div>
      </Link>
  );
}

export default FoodCard;