import React from "react";

const Experience = ({experience}) => {

    
    return (
        <div onClick={() => addExperienceToTrip()} className="flex flex-col border-2 border-black mt-4">
            {experience.title}
            <div>
            {experience.rating}/5
            </div>
            {experience.description}
        </div>
    )
};

export default Experience;