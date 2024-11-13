import React from "react";
import { useState } from "react";
import ExperiencesSearchBar from "./ExperiencesSearchBar.jsx";
import ExperienceModal from "./ExperienceModal.jsx";

const SearchBarContainer = () => {

    return (
        
        <div className="flex flex-col items-center  max-w-3xl min-w-[200px] mx-auto">
            <ExperiencesSearchBar />
        </div>
        
    );
};

export default SearchBarContainer;