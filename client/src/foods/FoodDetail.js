import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import MacroFriendApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./FoodDetail.css"

function FoodDetail() {

    const { currentUser } = useContext(UserContext); 
    const history = useHistory();
    const { name } = useParams();
    console.debug("FoodDetail", "name=", name)

    const [servings, setServings] = useState();
    const [nutrition, setNutrition] = useState();


    /** Update serving */
    function handleChange(evt) {
        setServings(evt.target.value);
    }

    const handleSubmit = async function(evt) {
        evt.preventDefault();
        const data = {
            foodName: nutrition.name,
            servingQty: parseInt(servings),
            servingUnit: nutrition.serving_unit,
            servingWeightGrams: parseInt(nutrition.serving_weight_grams) * servings,
            calories: parseInt(nutrition.calories) * servings,
            carbs: parseInt(nutrition.carbs) * servings,
            fat: parseInt(nutrition.fat) * servings,
            protein: parseInt(nutrition.protein) * servings,
            thumb: nutrition.photo.highres,
            username: currentUser.username
        }
        await MacroFriendApi.addFood(data);
        history.push("/log");
    }

    useEffect(function getNutritionInfo() {
        async function getNutrition() {
            let data = await MacroFriendApi.getNutrition(name)
            setNutrition(data);
            console.log(nutrition);
        }
        getNutrition();
    }, [name]);

    if (!nutrition) return <LoadingSpinner />;

    return (
        <div className="FoodDetail">
            <form className="card-body" onSubmit={handleSubmit}>
                <img src={ nutrition.photo.thumb } alt="Card image cap"></img>
                <div>
                    <h5 class="card-title">{nutrition.name}</h5>
                    <p class="card-text">Serving Size: {nutrition.serving_qty} {nutrition.serving_unit}, {nutrition.serving_weight_grams} grams</p>
                    <p class="card-text">Total Calories: {nutrition.calories}</p>
                    <p class="card-text">Total Fat: {nutrition.fat}</p>
                    <p class="card-text">Total Carbohydrates: {nutrition.carbs}</p>
                    <p class="card-text">Total Protein: {nutrition.protein}</p>
                    <label for="servings">Servings:</label>
                    <input
                        required
                        placeholder="Number of servings"
                        id="servings"
                        name="servings"
                        type="number"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" class="btn btn-primary">Log Food</button>
            </form>
        </div>
    )
};

export default FoodDetail;