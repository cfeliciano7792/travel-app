import React from "react";

const Experience = ({experience}) => {

    
    return (
        <div onClick={() => addExperienceToTrip()} className="flex flex-col border-2 border-black mt-4 p-4 max-w-3xl">
            {experience.title}
            <div>
            {experience.rating}/5
            </div>
            <div className="content-start mx-auto text-left line-clamp-1">
            {experience.description}
            </div>
        </div>
    )
};

export default Experience;