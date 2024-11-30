import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

import Cookies from "js-cookie"

function ViewTrip() {

    const user_id = Cookies.get('user_id')
    console.log(user_id)

    return(
        <>
        <Navbar />
        <div>
            <h1>Your Saved Experiences</h1>
        </div>
        </>
    )
}

export default ViewTrip;