import React from "react";
import Trip from "./Trip";


const TripSearchResults = ({input, trips}) => {

    const filterArray = () => {
        let filteredArray = trips.filter(trip => trip.title.toLowerCase().includes(input.toLowerCase())
        );
    
        return filteredArray.map(trip => (<Trip key={trip.trip_id} trip={trip} />
        ));
      };
      
    return(
        <div className="flexbox items-center justify-center">
            {filterArray()}
            {/* {experiences.map((experience) => (
                <Experience key={experience.experience_id} data={experience} />
            ))} */}
        </div>
    );
};

export default TripSearchResults;