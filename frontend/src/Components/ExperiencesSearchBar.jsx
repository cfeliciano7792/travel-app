import React from "react";
import { useState, useEffect } from "react";
import {FaSearch} from "react-icons/fa"

const ExperiencesSearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [experiences, setExperiences] = useState([])

    
    useEffect(() => {
        fetch("http://localhost:5000/api/experiences")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setExperiences(data)
            })
        }, []);

    
    const handleChange = (value) => {
        setSearchInput(value);
    }

    return(
        <>
        <div className="flex items-center bg-white rounded-xl h-10 w-full px-4 py-0 shadow-lg ">
            <FaSearch className="text-blue-700 text-2xl" />
            <input
                className="bg-transparent border-none h-10 outline-none focus:outline-none "
                placeholder="Type to search..."
                value={searchInput}
                onChange={(e) => handleChange(e.target.value)} />
        </div>
        </>
    );
};

export default ExperiencesSearchBar;

// p-0 text-base leading-normal text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500