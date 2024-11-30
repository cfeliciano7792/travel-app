// Description: This component is responsible for displaying each individual trip on the mytrips page. 
// Each trip has an accompanying Edit and Delete button.

import React from "react";
import { useState, useEffect } from "react";
import EditTripModal from "./EditTripModal";
import { Link } from "react-router-dom";



const Trip = ({trip}) => {
    const [showEditModal, setShowEditModal] = useState(false)


    const handleDeleteClick= () => {
        console.log('TRIP:', trip);
        console.log('tripID:',trip.trip_id);
        fetch('http://localhost:5000/api/trips/' + trip.trip_id, {
            method: 'DELETE'
        }).then((res) => {
            console.log("RES object:", res);
            console.log('TRIP WAS DELETED');
        })
    };

    
    
    return (
        <Link to={`/mytrips/${trip.trip_id}`} state={trip}>
        <div className="flex flex-col text-xl bg-white border-2 border-black mt-4 p-4 max-w-3xl hover:border-4 hover:shadow-2xl hover:border-blue-700">
            {trip.title}
            {/* {trip.description} */}
            <div>
            <button className="mt-2 mx-2 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleDeleteClick}>DELETE</button>
            <button className="mt-2 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={() => setShowEditModal(true)}>EDIT</button>
            </div>
            {showEditModal && <EditTripModal onClose={() => setShowEditModal(false)} trip={trip} />}
        </div>
        </Link>
    )
};

export default Trip;