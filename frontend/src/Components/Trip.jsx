import React from "react";

const Trip = ({trip}) => {

    
    return (
        <div onClick={() => addExperienceToTrip()} className="flex flex-col border-2 border-black mt-4">
            {trip.title}
            {/* {trip.description} */}
        </div>
    )
};

export default Trip;