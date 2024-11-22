// Description: This modal component displays the create a trip form
// Code adapted from: https://www.youtube.com/watch?v=Gy4G68WoHq4

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


function TripModal({onClose}) {
    const navigate = useNavigate();
    const user_id = Cookies.get('user_id')

    const [values, setValues] = useState({
        title: "",
        user_id: user_id
        
        // description: "",
        // dates: "",
        // photo: "",
    });
    

    const handleTripTitleInputChange = (event) => {
        console.log('title added');
        setValues({ ...values, title: event.target.value });
      };
    
    // const handleDescriptionInputChange = (event) => {
    // setValues({ ...values, description: event.target.value });
    // };

    // const handleDatesInputChange = (event) => {
    //     setValues({ ...values, dates: event.target.value });
    //     };
   
    const userData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      }

    // EXPERIMENTAL CODE:
    const handleTripFormSubmit = (event) => {
        event.preventDefault();
        onClose()
        console.log(values)
        console.log('submitted form');
        fetch('http://localhost:5000/api/trips', userData)
        .then(() => {
            console.log('new trip added');
        })
    }

    return(
        <div className="fixed inset-8  backdrop-blur-sm">
            <div>
                <div className="bg-gray-50 rounded-xl px-5 py-5 flex flex-col gap-5 items-center">
                    <h1 className="font-bold">Fill out your trip details.</h1>
                    <form action="" onSubmit={handleTripFormSubmit}>
                        <div className="container mx-auto px-4 pb-4 md:grid-cols-1 bg-neutral-200 text-left	">
                            <div>
                                <label htmlFor="trip_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Title:</label>
                                <input value={values.title} type="text" id="trip_title" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleTripTitleInputChange} required />
                            </div>
                            {/* <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                <input value={values.description} type="text" id="description" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDescriptionInputChange} />
                            </div>
                            <div>
                                <label htmlFor="dates" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Travel Dates:</label>
                                <input value={values.dates} type="date" id="dates" className="bg-gray-50 border-emerald-600	text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDatesInputChange} />
                            </div> */}
                            {/* <div>
                                <label htmlFor="photo_upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Upload:</label>
                                <input value={values.photo} type="file" id="photo_upload" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePhotoInputChange} required />
                            </div> */}
                        </div>
                        <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-700	focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button onClick={onClose} type="cancel" className="text-black bg-neutral-50	 hover:bg-neutral-200	focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default TripModal


