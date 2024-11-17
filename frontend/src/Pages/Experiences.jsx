import React from "react";
import { useState, useEffect } from "react";
import SearchContainer from "../Components/SearchContainer";
import ExperienceModal from "../Components/ExperienceModal.jsx";
import SearchResults from "../Components/SearchResults.jsx";
import ExperiencesSearchBar from "../Components/ExperiencesSearchBar.jsx";

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
        <div className=" w-full items-center h-screen bg-gray-200">
        <h1 className="text-3xl ">Search Experiences</h1>
            <div className="flex flex-col items-center  max-w-3xl min-w-[200px] mx-auto">
            <ExperiencesSearchBar  setInput={setInput}/>
            </div>
            <button className="max-w-40" onClick={() => setShowModel(true)}>Add Experience</button>
            <div>
                {showModal && <ExperienceModal onClose={() => setShowModel(false)}/>}
            </div>
            <div className=" items-center h-3/4 mx-40 max-w-2xl">
                <SearchResults input={input} experiences={experiences}/>
            </div>
        </div>
        </>
    );
};

export default Experiences;
