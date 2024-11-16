import React from "react";
import { useState } from "react";
import TripModal from "../Components/TripModal";
import TripsSearchBar from "../Components/TripSearchBar";


const MyTrips = () => {
    const [showTripModal, setShowTripModal] = useState(false)
    return (
        
        <div className="mytrips px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
            <h1 className="mt-8 text-xl sm:text-2xl text-center">My Trips</h1>
            <div className="mt-4 mb-10 max-w-lg mx-auto">
                <TripsSearchBar />
            </div>
            <button onClick={() => setShowTripModal(true)} className="text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Trip</button>
            {showTripModal && <TripModal onClose={() => setShowTripModal(false)}/>}
        </div>  
    );
}
export default MyTrips;