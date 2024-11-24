// Description: This component is responsible for displaying each individual trip on the mytrips page. 
// Each trip has an accompanying Edit and Delete button.

import React from "react";
import { useState, useEffect } from "react";
import EditTripModal from "./EditTripModal";



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
        <div className="flex flex-col border-2 border-black mt-4">
            {trip.title}
            {/* {trip.description} */}
            <button onClick={handleDeleteClick}>DELETE</button>
            <button onClick={() => setShowEditModal(true)}>EDIT</button>
            {showEditModal && <EditTripModal onClose={() => setShowEditModal(false)} trip={trip} />}
        </div>
    )
};

export default Trip;