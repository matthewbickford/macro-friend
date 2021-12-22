import React from "react";
import { useHistory } from "react-router";
import "./LogCard.css";
import defaultImg from "../common/default_256.png"
import MacroFriendApi from "../api/api";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function LogCard({
    id,
    name, 
    servingQty, 
    servingUnit, 
    calories, 
    carbs, 
    fat, 
    protein, 
    thumb, 
}) {
    
    const history = useHistory();
    console.debug("LogCard");

    async function handleRemove(evt) {
        evt.preventDefault();
        MacroFriendApi.remove(id, {})
        history.go(0);
    }

  return (
      <div>
            <div className="LogCard card">
                <div className="card-body">
                <h3 className="card-title">
                    {name} - {servingUnit} ({servingQty})
                </h3>
                </div>
                <img src={thumb || defaultImg}
                    alt={name}
                    className="float-right ml-5" />
                <p>Calories: {calories} / Carbs: {carbs} / Fat: {fat} / Protein: {protein} </p>
                <form onSubmit={handleRemove}>
                    <button className="btn btn-danger">Remove</button>
                </form>
            </div>
      </div>

  );
}

export default LogCard;