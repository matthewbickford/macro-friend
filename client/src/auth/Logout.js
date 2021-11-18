import React from "react";
import { Redirect } from "react-router";

/** Logout
 * 
 * Logs out user 
 *
 * Routes -> Logout
 * Redirected to Homepage
 */

function Logout({ logout }) {
    logout();
    return <Redirect to="/" />;
}

export default Logout;