import React from "react";
import { useState, useEffect } from "react";
import {FaSearch} from "react-icons/fa"

const TripsSearchBar = ({setInput}) => {
    

    return(
        <>
        <div className="flex items-center bg-white rounded-xl h-10 w-full px-4 py-0 shadow-lg ">
            <FaSearch className="text-blue-700 text-2xl" />

            <input
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none h-10 outline-none focus:outline-none "
                type = "text"
                placeholder="Type to search..." 
                />
            
        </div>
        </>
    );
};

export default TripsSearchBar;