import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TripDropdown from "../Components/TripDropdown.jsx";
import EditExperienceModal from "../Components/EditExperienceModal.jsx";
import Map from "../Components/Maps.jsx";

import Cookies from "js-cookie"

function ViewExperience() {

    useEffect(() => {
        let url = window.location.href
        let id = url.split("/")[4]
        fetch(`http://localhost:5000/api/experiences/${id}`)
            .then(res => res.json())
            .then(experience => setExperienceDetails(experience))
        
        }, []);

    const [showModal, setShowModel] = useState(false)

    const user_id = Cookies.get('user_id')

    // States for upvotes, downvotes, and voting restriction
    const [downvotes, setDownvotes] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [experienceDetails, setExperienceDetails] = useState({})
    const [upvotes, setUpvotes] = useState(0);
      
    const handleEditClick = () => {
        setExperienceDetails(experienceDetails);
        setShowModel(true);
    };

    const disableVoting = () => {
        setTimeout(() => {
            setHasVoted(true)
        }, 1000)
    }

    const handleUpvote = () => {
        
        fetch(`http://localhost:5000/api/experiences/${experienceDetails.experience_id}/upvote`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => 
            response.json()
        )
        .then(data => {
            setUpvotes(data.upvotes)
            disableVoting()
            });
        }


    const handleDownvote = () => {
        fetch(`http://localhost:5000/api/experiences/${experienceDetails.experience_id}/downvote`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => 
            response.json()
        )
        .then(data => {
            setDownvotes(data.downvotes)
            disableVoting()
            });
    };

    return(
        <>
        <Navbar />
        <TripDropdown experienceID={experienceDetails.experience_id}/>
        <div>
            <h1 className="text-3xl mt-4">{experienceDetails.title}</h1>
        </div>
        <div>
            <h1 className="text-3xl mt-4">{Math.round(experienceDetails.rating)}/5</h1>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg flex flex-wrap mt-6 gap-4 w-3/4 mx-auto">
            {/* Description Section */}
            <div className="flex-1">
                <div className="text-lg font-medium mb-4">Description</div>
                <div>{experienceDetails.description}</div>
            </div>

            {/* Location Section */}
            <div className="flex-1">
                <div className="text-lg font-medium mb-4">Location</div>
                <div className="mb-2"> ( {experienceDetails.location_coordinates} )</div>
                <div>
                    {experienceDetails.location_coordinates && (
                        <Map coordinates={experienceDetails.location_coordinates} />
                    )}
                </div>
            </div>
        </div>


    
        <div className="mt-6">
            <h2 className="text-2xl">Photo:</h2>
            {experienceDetails.photos && experienceDetails.photos.length > 0 ? (
                <img
                    src={`http://localhost:5000${experienceDetails.photos[0]}`}
                    alt="Experience"
                    className="max-w-lg mx-auto h-auto rounded-lg shadow-lg mt-4"
                />
            ) : (
                <p>No photo available.</p>
            )}
        </div>

        <div> 
        {experienceDetails.user_id == user_id && (
        <button className="mt-2 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleEditClick}>Edit Experience</button>
        )}
        {showModal && <EditExperienceModal experienceDetails={experienceDetails}  onClose={() => setShowModel(false)}/>}
        </div>

        {/* Voting Section */}
        {experienceDetails.user_id != user_id && (
        <div className="mt-4 flex justify-center items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleUpvote}
                        className="text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-2"
                        disabled={hasVoted}
                    >
                        👍
                    </button>
                    <span>{upvotes || experienceDetails.upvotes} Helpful</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDownvote}
                        className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-2"
                        disabled={hasVoted}
                    >
                        👎
                    </button>
                    <span>{downvotes || experienceDetails.downvotes} Unhelpful</span>
                </div>
            </div>
            )}
        </>
    )
}

export default ViewExperience;