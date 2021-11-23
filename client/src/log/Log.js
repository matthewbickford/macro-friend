import React from "react";
import { useState, useEffect } from "react";
import MacroFriendApi from "../api/api";
import LogCard from "./LogCard";
import LoadingSpinner from "../common/LoadingSpinner";

function Log() {
    console.debug("FoodLog");

    const [foods, setFoods] = useState();
  
    useEffect(function getAllFoodsOnMount() {
      console.debug("FoodLog useEffect getAllFoodsOnMount");
      search();
    }, []);
  
    /** Triggered by search form submit; reloads foods. */
    async function search() {
      let res = await MacroFriendApi.getAll();
      console.log(res);
      setFoods(res.foods);
    }
  
    if (!foods) return <LoadingSpinner />;

    return (
      <div>
        {foods.map(food => (
          <LogCard
            name={food.foodName}
            servingQty={food.servingQty} 
            servingUnit={food.servingUnit}
            calories={food.calories}
            fat={food.fat}
            carbs={food.carbs}
            protein={food.protein}
            thumb={food.thumb}
          />
        ))}
      </div>
    )
};

export default Log;