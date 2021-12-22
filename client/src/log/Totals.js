import React from "react";
import { useState, useContext, useEffect } from "react";
import MacroFriendApi from "../api/api";
import UserContext from "../auth/UserContext";

function Totals({ calories, protein, fat, carbs, handleReset }) {

    const { currentUser } = useContext(UserContext);
    const [macros, setMacros] = useState();

    // useEffect(function getMacrosOnMount() {
    //     console.debug("FoodLog useEffect getMacrosMount");
    //     search();
    //   }, []);

    /** Get marcro information on load */
    // async function search() {
    //     let res = await MacroFriendApi.getMacros(currentUser);
    //     console.log(res);
    //     setMacros(res);
    // }

    return (
            <form id="total" onSubmit={handleReset}>
                <span id="head">Cals: {calories} / Protein: {protein} / Fat: {fat} / Carbs: {carbs} </span>
                <button className="btn btn-warning">Reset</button>
            </form>
    )
}

export default Totals;

