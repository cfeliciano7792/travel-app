import React from "react";
import { useState, useEffect } from "react";
import ExperienceModal from "../Components/ExperienceModal.jsx";
import SearchResults from "../Components/SearchResults.jsx";
import ExperiencesSearchBar from "../Components/ExperiencesSearchBar.jsx";
import Navbar from "../Components/Navbar.jsx";


const Experiences = () => {

    const [showModal, setShowModel] = useState(false)
    const [experiences, setExperiences] = useState([])
    const [input, setInput] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/api/experiences")
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data);
                setExperiences(data)
            })
        }, []);



    console.log(input)

    return (
        <>
        <Navbar />
        <div className=" w-full items-center min-h-screen bg-gray-200 ">
        <h1 className="text-3xl ">Search Experiences</h1>
            <div className="flex flex-col items-center  max-w-3xl min-w-[200px] mx-auto">
            <ExperiencesSearchBar  setInput={setInput}/>
            </div>
            <button className="mt-2 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={() => setShowModel(true)}>Add Experience</button>
            <div>
                {showModal && <ExperienceModal onClose={() => setShowModel(false)}/>}
            </div>
            <div className="flex justify-center items-center mx-auto">
                <SearchResults input={input} experiences={experiences} />
            </div>
        </div>
        </>
    );
};

export default Experiences;
