import React from "react";
import { useState, useEffect } from "react";
import TripModal from "../Components/TripModal";
import TripSearchResults from "../Components/TripSearchResults";
import TripsSearchBar from "../Components/TripSearchBar";
import Navbar from "../Components/Navbar";

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
        
        <><Navbar /><div className="w-full items-center min-h-screen bg-gray-200">
            <h1 className="text-3xl">My Trips</h1>
            <div className="flex flex-col items-center  max-w-3xl min-w-[200px] mx-auto">
                <TripsSearchBar setInput={setInput} />
            </div>
            <button onClick={() => setShowTripModal(true)} className="mt-2 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Trip</button>
            {showTripModal && <TripModal onClose={() => setShowTripModal(false)} trips={trips} setTrips={setTrips} />}
            <div className="flex justify-center items-center mx-auto">
                <TripSearchResults input={input} trips={trips} />
            </div>
        </div></>  
    );
}
export default MyTrips;