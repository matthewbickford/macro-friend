import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import MacroFriendApi from "../api/api";
import UserContext from "../auth/UserContext";
import LogCard from "./LogCard";
import Totals from "./Totals";
import LoadingSpinner from "../common/LoadingSpinner";

function Log() {

    console.debug("FoodLog");
    const history = useHistory();
    const { currentUser } = useContext(UserContext);
    const [foods, setFoods] = useState();
    const [calories, setCalories] = useState();
    const [protein, setProtein] = useState();
    const [fat, setFat] = useState();
    const [carbs, setCarbs] = useState();
  
    useEffect(function getAllFoodsOnMount() {
      console.debug("FoodLog useEffect getAllFoodsOnMount");
      search();
    }, []);

    useEffect(function updateTotals() {
      console.debug("Updating macro totals")
      if (foods) update();
    }, [foods]);

    /** Triggered by search form submit; reloads foods. */
    async function search() {
      let res = await MacroFriendApi.getAll();
      setFoods(res.foods);
    }

    /** Rest entire day. Hits client API then backend */
    async function handleReset(evt) {
      evt.preventDefault();
      for (let food of Object.keys(foods)) {
        MacroFriendApi.remove(foods[food].id, {})
      }
      history.go(0);
    }

    /** Triggered by updating "foods" */
    function update() {
      let cals = 0;
      let pro = 0;
      let f = 0
      let c = 0;
      for (let food of Object.keys(foods)) {
        if (foods[food].calories) cals += parseInt(foods[food].calories)
        if (foods[food].protein) pro += parseInt(foods[food].protein)
        if (foods[food].fat) f += parseInt(foods[food].fat)
        if (foods[food].carbs) c += parseInt(foods[food].carbs)
      }
      setCalories(cals);
      setProtein(pro);
      setFat(f);
      setCarbs(c);
    }


 
  
    if (!foods) return <LoadingSpinner />;

    return (
      <div>
        {foods.length 
        ? <div>
              <Totals
                handleReset={handleReset} 
                calories={calories}
                protein={protein}
                fat={fat}
                carbs={carbs}
              />
            {foods.map(food => (
              <LogCard
                id={food.id}
                key={food.id}
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
        : <p className="lead">Use search feature to find foods to log</p>
      }
      </div>
    )
};

export default Log;