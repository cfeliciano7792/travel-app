import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

import Cookies from "js-cookie"

function ViewExperience() {

    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState("")

    const user_id = Cookies.get('user_id')

    const location = useLocation();
    const experienceDetails = location.state
    console.log(experienceDetails)
    

    useEffect(() => {
        fetch(`http://localhost:5000/api/trips/user/${user_id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setTrips(Array.isArray(data) ? data : []);
            })
        }, []);

    let handleTripChange = (e) => {
        setSelectedTrip(e.target.value)
      }       



    return(
        <>
        <Navbar />
        <div>
            <form action="">
                <select onChange={handleTripChange}> 
                    <option value=""> -- Select a Trip -- </option>
                        {/* Mapping through each trip object in our trips array
                        and returning an option element with the title.
                        */}
                    {trips
                    .filter((trip) => trip.title.length > 1)
                    .map((trip) => <option value={trip.title}>{trip.title}</option>)}
                    </select>
                <button type="submit" className="mt-2 ml-10 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Experience to Trip</button>
            </form>
        </div>
        <div>
            <h1 className="text-3xl mt-4">{experienceDetails.title}</h1>
        </div>
        <div className="mt-6">
            {experienceDetails.description}
        </div>
        </>
    )
}

export default ViewExperience;