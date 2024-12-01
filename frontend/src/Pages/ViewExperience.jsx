import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import EditExperienceModal from "../Components/EditExperienceModal.jsx";

import Cookies from "js-cookie"

function ViewExperience() {

    const [showModal, setShowModel] = useState(false)
    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState("")

    const user_id = Cookies.get('user_id')
    console.log(user_id)

    const location = useLocation();
    const experienceDetails = location.state;
    console.log(experienceDetails)

    // States for upvotes, downvotes, and voting restriction
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);

    const voteKey = `voted_${experienceDetails.experience_id}`;

    useEffect(() => {
        // Initialize voting status and counts from localStorage
        const voteStatus = localStorage.getItem(voteKey);
        setHasVoted(voteStatus === "true");

        // Load vote counts if stored (optional)
        const storedCounts = JSON.parse(localStorage.getItem(`counts_${experienceDetails.experience_id}`)) || {};
        setUpvotes(storedCounts.upvotes || 0);
        setDownvotes(storedCounts.downvotes || 0);
    }, [experienceDetails.experience_id, voteKey]);
    

    useEffect(() => {
        fetch(`http://localhost:5000/api/trips/user/${user_id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setTrips(Array.isArray(data) ? data : []);
            })
        }, []);

    let handleTripChange = (e) => {
        setSelectedTrip(e.target.value)
      }
      
    const handleEditClick = () => {
        setSelectedTrip(experienceDetails.experience_id);
        setShowModel(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/trip-experiences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({trip_id: selectedTrip, experience_id: experienceDetails.experience_id})
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Experience added to Trip:", data);
            } else {
                console.error("Failed to add experience to trip");
            }
        } catch (err) {
            console.error("Error linking experience to trip:", err);
        }
    };


    const handleUpvote = () => {
        if (hasVoted) {
            alert("You have already voted!");
            return;
        }
        const updatedUpvotes = upvotes + 1;
        setUpvotes(updatedUpvotes);
        setHasVoted(true);
        saveVotes(updatedUpvotes, downvotes);
    };

    const handleDownvote = () => {
        if (hasVoted) {
            alert("You have already voted!");
            return;
        }
        const updatedDownvotes = downvotes + 1;
        setDownvotes(updatedDownvotes);
        setHasVoted(true);
        saveVotes(upvotes, updatedDownvotes);
    };

    const saveVotes = (updatedUpvotes, updatedDownvotes) => {
        // Save votes and status in localStorage
        localStorage.setItem(voteKey, "true");
        localStorage.setItem(
            `counts_${experienceDetails.experience_id}`,
            JSON.stringify({ upvotes: updatedUpvotes, downvotes: updatedDownvotes })
        );
    };

    return(
        <>
        <Navbar />
        <div>
            <form onSubmit={handleFormSubmit}>
                <select onChange={handleTripChange} value={selectedTrip}> 
                    <option value=""> -- Select a Trip -- </option>
                        {/* Mapping through each trip object in our trips array
                        and returning an option element with the title.
                        */}
                    {trips
                    .filter((trip) => trip.title.length > 1)
                    .map((trip) => <option key={trip.trip_id} value={trip.trip_id}>{trip.title}</option>)}
                    </select>
                <button type="submit" className="mt-2 ml-10 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Experience to Trip</button>
            </form>
        </div>
        <div>
            <h1 className="text-3xl mt-4">{experienceDetails.title}</h1>
        </div>
        <div>
            <h1 className="text-3xl mt-4">{experienceDetails.rating}/5</h1>
        </div>
        <div className="mt-6">
            {experienceDetails.description}
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
                    <span>{upvotes} Helpful</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDownvote}
                        className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-2"
                        disabled={hasVoted}
                    >
                        👎
                    </button>
                    <span>{downvotes} Unhelpful</span>
                </div>
            </div>
            )}
        </>
    )
}

export default ViewExperience;