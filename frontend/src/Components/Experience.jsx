import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Experience = ({experience}) => {

    const navigate = useNavigate()

    // const viewExperience = () => {
    //     console.log(experience)
    //     navigate(`/experiences/${experience.experience_id}`)
    // }

    return (
        <Link to={`/experiences/${experience.experience_id}`} state={experience}>
            <div  className="flex flex-col bg-white border-2 border-black mt-4 p-4 max-w-3xl hover:border-4 hover:shadow-2xl hover:border-blue-700">
                
                {experience.title}
                <div>
                {experience.rating}/5
                </div>
                <div className="content-start mx-auto text-left line-clamp-1">
                {experience.description}
                </div>
                
            </div>
        </Link>
    )
};

export default Experience;