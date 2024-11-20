import React from "react";
import { useState, useEffect } from "react";
import TripModal from "../Components/TripModal";
import TripSearchResults from "../Components/TripSearchResults";
import TripsSearchBar from "../Components/TripSearchBar";

import Cookies from 'js-cookie'



const MyTrips = () => {
    const [showTripModal, setShowTripModal] = useState(false)
    const [trips, setTrips] = useState([])
    const [input, setInput] = useState("")

    const user_id = Cookies.get('user_id')

    useEffect(() => {
        fetch(`http://localhost:5000/api/trips/user/${user_id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setTrips(data)
            })
        }, []);

    return (
        
        <div className="w-full items-center h-screen bg-gray-200">
            <h1 className="text-3xl">My Trips</h1>
            <div className="flex flex-col items-center  max-w-3xl min-w-[200px] mx-auto">
                <TripsSearchBar setInput={setInput}/>
            </div>
            <button onClick={() => setShowTripModal(true)} className="text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Trip</button>
            {showTripModal && <TripModal onClose={() => setShowTripModal(false)}/>}
            <div className=" items-center h-3/4 mx-40 max-w-2xl">
                <TripSearchResults input={input} trips={trips}/>
            </div>
        </div>  
    );
}
export default MyTrips;