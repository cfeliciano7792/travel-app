import React from "react";
import Trip from "./Trip";


const TripSearchResults = ({input, trips}) => {

    const filterArray = () => {

        // If trips is not an array or is empty, return an empty array
        if (!Array.isArray(trips) || trips.length === 0) {
            console.warn("No trips available to filter.");
            return <p>No trips available.</p>; // Message to display when no trips are available
        }

        let filteredArray = trips.filter(trip => trip.title.toLowerCase().includes(input.toLowerCase())
        );
    
        return filteredArray.map(trip => (<Trip key={trip.trip_id} trip={trip} />
        ));
      };
      
    return(
        <div className="flexbox items-center justify-center min-w-96">
            {filterArray()}
            {/* {experiences.map((experience) => (
                <Experience key={experience.experience_id} data={experience} />
            ))} */}
        </div>
    );
};

export default TripSearchResults;