// Description: This modal component displays the create a trip form. The form opens upon a user clicking on the 'Add Trip' button 
// on the MyTrips page. The form closes in response to the user clicking on either the 'submit' or 'cancel' buttons.
// Code adapted from: https://www.youtube.com/watch?v=Gy4G68WoHq4

import React, { useState } from "react";
import Cookies from 'js-cookie'


function TripModal({onClose , trips, setTrips}) {
    const user_id = Cookies.get('user_id')
    


    const [values, setValues] = useState({
        user_id: user_id,
        title: "",
        description: "",
        trip_date: "",
        
    });
    

    const handleTripTitleInputChange = (event) => {
        setValues({ ...values, title: event.target.value });
      };
    
    const handleDescriptionInputChange = (event) => {
    setValues({ ...values, description: event.target.value });
    };

    const handleDatesInputChange = (event) => {
        setValues({ ...values, trip_date: event.target.value });
        };
    

    const handleTripFormSubmit = (event) => {
        onClose()
        console.log(values);
        console.log('submitted form');
        event.preventDefault();
        fetch('http://localhost:5000/api/trips', {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(values)
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            let newTrips = [...trips, res]
            setTrips(newTrips)
            console.log('NEW TRIPS ARRAY:', newTrips);
        })
    }


    return(
        <div className="fixed inset-8  backdrop-blur-sm">
            <div>
                <div className="bg-gray-50 rounded-xl px-5 py-5 flex flex-col gap-5 items-center">
                    <h1 className="font-bold">Fill out your trip details.</h1>
                    <form action="" onSubmit={handleTripFormSubmit}>
                        <div className="container mx-auto px-4 pb-4 md:grid-cols-1 bg-neutral-200 text-left">
                            <div>
                                <label htmlFor="trip_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Title:</label>
                                <input value={values.title} type="text" id="trip_title" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleTripTitleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                <input value={values.description} type="text" id="description" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDescriptionInputChange} />
                            </div>
                            <div>
                                <label htmlFor="trip_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Travel Dates:</label>
                                <input value={values.trip_date} type="date" id="dates" className="bg-gray-50 border-emerald-600text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDatesInputChange} />
                            </div>
                         
                        </div>
                        <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-700focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button onClick={onClose} type="cancel" className="text-black bg-neutral-50 hover:bg-neutral-200focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default TripModal


