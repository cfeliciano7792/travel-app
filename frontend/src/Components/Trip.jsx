// Description: This component is responsible for displaying each individual trip on the mytrips page. 
// Each trip has an accompanying Edit and Delete button.

import React from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";



const Trip = ({trip}) => {
    const navigate = useNavigate();
    const user_id = Cookies.get('user_id')




    const handleDeleteClick= () => {
        // console.log('TRIP:', trip);
        // console.log('tripID:',trip.trip_id);
        fetch('http://localhost:5000/api/trips/' + trip.trip_id, {
            method: 'DELETE'
        }).then(() => {
            // console.log('TRIP WAS DELETED');
            navigate(`/mytrips`)
        })
    };

    const handleEditClick= () => {
        // console.log('TRIP:', trip);
        // console.log('tripID:',trip.trip_id);
        fetch('http://localhost:5000/api/trips/' + user_id, + trip.trip_id, {
            method: 'PUT',
            headers: {"content-type":"application/json"},
            body: JSON.stringify()
        }).then(res => {
            if (!res.ok) {
                console.log('Failure to Edit Trip');
                return;
            }
            return res.json();
        })
        .then(data => {
            console.log('Success');
        })
        .catch(error => {
            console.log(error);
        })
    };
    
    return (
        <div onClick={() => addExperienceToTrip()} className="flex flex-col border-2 border-black mt-4">
            {trip.title}
            {/* {trip.description} */}
            <button onClick={handleDeleteClick}>delete</button>
            <button onClick ={handleEditClick}>edit</button>
        </div>
    )
};

export default Trip;