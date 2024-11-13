import React from "react";
import { useState } from "react";
import SearchContainer from "../Components/SearchContainer";
import ExperienceModal from "../Components/ExperienceModal.jsx";

const Experiences = () => {

    const [showModal, setShowModel] = useState(false)

    return (
        <>
        <div className="w-full h-screen bg-gray-200">
            <h1 className="text-3xl ">Search Experiences</h1>
            <div className="mt-4">
                <SearchContainer />
            </div>
            <button className="max-w-40" onClick={() => setShowModel(true)}>Add Experience</button>
            <div>
                {showModal && <ExperienceModal onClose={() => setShowModel(false)}/>}
            </div>
        </div>
        </>
    );
};

export default Experiences;