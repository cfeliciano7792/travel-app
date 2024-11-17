import React from "react";
import Experience from "./Experience";


const SearchResults = ({input, experiences}) => {

    const filterArray = () => {
        let filteredArray = experiences.filter(experience => experience.title.toLowerCase().includes(input.toLowerCase())
        );
    
        return filteredArray.map(experience => (<Experience key={experience.experience_id} experience={experience} />
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

export default SearchResults;