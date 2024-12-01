import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";
import Experience from "../Components/Experience"; // Import the Experience component

function ViewTrip() {
    const location = useLocation();
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState([]); // State to store experiences
    const [error, setError] = useState(null); // State for error handling

    // Access the state passed via the Link
    const trip = location.state;

    const user_id = Cookies.get("user_id");
    console.log(user_id);
    console.log(trip);

    useEffect(() => {
        if (!trip) {
            console.error("No trip data found. Redirecting to MyTrips.");
            navigate("/mytrips"); // Redirect if no trip data
            return;
        }

        fetch(`http://localhost:5000/api/trip-experiences/trip/${trip.trip_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch trip experiences");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setExperiences(data); // Store the fetched data in state
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load experiences.");
            });
    }, [trip, navigate]);

    if (error) {
        return (
            <>
                <Navbar />
                <div>Error: {error}</div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Your Saved Experiences</h1>
                <div className="grid grid-cols-1 gap-4">
                    {experiences.length > 0 ? (
                        experiences.map((experience) => (
                            <Experience key={experience.experience_id} experience={experience} />
                        ))
                    ) : (
                        <p>No experiences found for this trip.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ViewTrip;