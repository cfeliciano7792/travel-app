import React from "react";
import { useState } from "react";
import ExperiencesSearchBar from "./ExperiencesSearchBar.jsx";

const SearchBarContainer = () => {

    return (
        
        <div className="flex flex-col items-center min-w-[200px] border-2 w-2/ mx-auto">
            <ExperiencesSearchBar />
        </div>
        
    );
};

export default SearchBarContainer;