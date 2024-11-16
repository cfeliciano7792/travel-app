import React from "react";
import { useState } from "react";
import {FaSearch} from "react-icons/fa"


const TripsSearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    // const [trips, setTrips] = useState([])
    
    // useEffect(() => {
    //     fetch("http://localhost:5000/api/trips")
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             console.log(data);
    //             setTrips(data)
    //         })
    //     }, []);

   
    
    const handleChange = (value) => {
        setSearchInput(value);
    }

    return(
        <>
        <div className="flex items-center bg-white rounded-xl h-10 w-full px-4 py-0 shadow-lg ">
            <FaSearch className="text-blue-700 text-2xl" />
            <input
                className="bg-transparent border-none h-10 outline-none focus:outline-none "
                placeholder="Type to search for trips..."
                value={searchInput}
                onChange={(e) => handleChange(e.target.value)} />
        </div>
        </>
    );
};

export default TripsSearchBar;