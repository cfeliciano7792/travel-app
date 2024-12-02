import { useState, useEffect } from "react"
import Cookies from "js-cookie"

function TripDropdown({experienceID}) {

    const user_id = Cookies.get('user_id')
    useEffect(() => {
    fetch(`http://localhost:5000/api/trips/user/${user_id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTrips(Array.isArray(data) ? data : []);
            })
    }, [])

    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState("")

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/trip-experiences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({trip_id: selectedTrip, experience_id: experienceID})
            });
            if (response.ok) {
                const data = await response.json();
            } else {
                console.error("Failed to add experience to trip");
            }
        } catch (err) {
            console.error("Error linking experience to trip:", err);
        }
    };

    let handleTripChange = (e) => {
        setSelectedTrip(e.target.value)
    }

    let mapTrips = () => {
        return trips.filter((trip) => trip.title.length > 1).map((trip) => <option key={trip.trip_id} value={trip.trip_id}>{trip.title}</option>)
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <select onChange={handleTripChange} value={selectedTrip}> 
                    <option value=""> -- Select a Trip -- </option>
                        {/* Mapping through each trip object in our trips array
                        and returning an option element with the title.
                        */}
                    {mapTrips()}
                    </select>
                <button type="submit" className="mt-2 ml-10 text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Experience to Trip</button>
            </form>
        </div>
    )
}

export default TripDropdown