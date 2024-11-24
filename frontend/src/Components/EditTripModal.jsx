import React, { useState } from "react";
import Cookies from 'js-cookie'


function EditTripModal({onClose, trip}) {
    const user_id = Cookies.get('user_id')
    
    const [values, setValues] = useState({
        user_id: user_id,
        trip_id: trip.trip_id,
        title: "",
        // description: "",
        
    });
    

    const handleTitleInputChange = (event) => {
        setValues({ ...values, title: event.target.value });
      };
    
    // const handleDescriptionInputChange = (event) => {
    // setValues({ ...values, description: event.target.value });
    // };



    const handleEditClick= (event) => {
        onClose()
        event.preventDefault();
        fetch('http://localhost:5000/api/trips/' + trip.trip_id, {
            method: 'PUT',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(values)
        }).then(res => {
            if (!res.ok) {
                console.log('Failure to Edit Trip');
                return;
            }
            return res.json();
        })
        .catch(error => {
            console.log(error);
        })
    };


    return(
        <div className="fixed inset-8  backdrop-blur-sm">
            <div>
                <div className="bg-gray-50 rounded-xl px-5 py-5 flex flex-col gap-5 items-center">
                    <h1 className="font-bold">Edit your trip details.</h1>
                    <form action="" onSubmit={handleEditClick}>
                        <div className="container mx-auto px-4 pb-4 md:grid-cols-1 bg-neutral-200 text-left">
                            <div>
                                <label htmlFor="trip_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Title:</label>
                                <input value={values.title} type="text" id="trip_title" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleTitleInputChange} required />
                            </div>
                            {/* <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                <input value={values.description} type="text" id="description" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDescriptionInputChange} />
                            </div> */}
                        </div>
                        <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-700focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button onClick={onClose} type="cancel" className="text-black bg-neutral-50 hover:bg-neutral-200focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default EditTripModal