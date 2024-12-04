// Description: This component is responsible for displaying each individual trip on the mytrips page. 
// Each trip has an accompanying Edit and Delete button.

import React from "react";
import { useState, useEffect } from "react";
import EditTripModal from "./EditTripModal";
import { Link } from "react-router-dom";



const Trip = ({trip}) => {
    const [showEditModal, setShowEditModal] = useState(false)


    const handleDeleteClick= (e) => {
        e.stopPropagation();
        console.log('TRIP:', trip);
        console.log('tripID:',trip.trip_id);
        fetch('https://travel-app-server-fkh8.onrender.com/api/trips/' + trip.trip_id, {
            method: 'DELETE'
        }).then((res) => {
            console.log("RES object:", res);
            console.log('TRIP WAS DELETED');
        })
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); 
        setShowEditModal(true);
    };

    
    
    return (
        <div className="flex flex-col text-xl bg-white border-2 border-black mt-4 mb-8 p-4 max-w-3xl hover:border-4 hover:shadow-2xl hover:border-blue-700">
            {/* Restrict the Link to only wrap the title */}
            <Link to={`/mytrips/${trip.trip_id}`} state={trip}>
                <div className="text-blue-600 hover:underline">{trip.title}
                </div>
            </Link>
            <div>
                {trip.description}
            </div>
            <div> 
                {trip.trip_date}
            </div>
            {/* Buttons */}
            <div>
                <button
                    className="mt-2 mx-2 text-white bg-rose-500 hover:bg-rose-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={handleDeleteClick}
                >
                    DELETE
                </button>
                <button
                    className="mt-2 text-white bg-blue-300 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={handleEditClick}
                >
                    EDIT
                </button>
            </div>
            {/* Modal */}
            {showEditModal && (
                <EditTripModal onClose={() => setShowEditModal(false)} trip={trip} />
            )}
        </div>
    );
};

export default Trip;