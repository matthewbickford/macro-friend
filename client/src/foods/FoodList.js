import React, { useState, useEffect } from "react";
import MacroFriendApi from "../api/api";
import FoodCardList from "./FoodCardList"
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";

/** Show page with list of foods.
 *
 * On mount, loads foods from API if present.
 * Re-loads filtered jobs on submit from search form.
 *
 * FoodsList -> FoodCardList -> FoodCard
 *
 * This is routed to at /search
 */

function FoodList() {
  console.debug("FoodList");

  const [foods, setFoods] = useState(null);

  useEffect(function getAllFoodsOnMount() {
    console.debug("foodsList useEffect getAllFoodsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads foods. */
  async function search(term) {
    let res = await MacroFriendApi.getFoods(term);
    setFoods(res);
    console.log(foods);
  }

  if (!foods) return <LoadingSpinner />;

  return (
      <div className="FoodList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {foods.length
            ? <FoodCardList foods={foods} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default FoodList;