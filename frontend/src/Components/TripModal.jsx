import React from "react";
import { useNavigate } from "react-router-dom";


function TripModal({onClose}) {
    const navigate = useNavigate();

    const handleTripFormSubmit = (event) => {
        event.preventDefault();
        navigate("/mytrips");
     };
    return(
        <div className="fixed inset-8  backdrop-blur-sm">
            <div>
                <div className="bg-gray-50 rounded-xl px-5 py-5 flex flex-col gap-5 items-center">
                    <h1 className="font-bold">Fill out your trip details.</h1>
                    <form>
                        <div className="container mx-auto px-4 pb-4 md:grid-cols-1 bg-neutral-200 text-left	">
                            <div>
                                <label for="trip_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Title:</label>
                                <input type="text" id="trip_title" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                <input type="text" id="description" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="dates" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Travel Dates:</label>
                                <input type="date" id="dates" className="bg-gray-50 border-emerald-600	text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="photo_upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Upload:</label>
                                <input type="file" id="photo_upload" className="bg-gray-50 border-emerald-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <button onSubmit={handleTripFormSubmit} type="submit" className="text-white bg-emerald-500 hover:bg-emerald-700	focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button onClick={onClose} type="cancel" className="text-black bg-neutral-50	 hover:bg-neutral-200	focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default TripModal



