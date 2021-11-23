import React from "react";
import "./LogCard.css";
import defaultImg from "../common/default_256.png"

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function LogCard({ name, servingQty, servingUnit, calories, carbs, fat, protein, thumb }) {
  console.debug("LogCard");

  return (
        <div className="LogCard card">
            <div className="card-body">
            <h3 className="card-title">
                {name}
            </h3>
            </div>
            <img src={thumb || defaultImg}
                alt={name}
                className="float-right ml-5" />
            <p>Carbs: {carbs} / Fat: {fat} / Protein: {protein} </p>
        </div>
  );
}

export default LogCard;