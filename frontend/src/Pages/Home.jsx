import React from "react";
import { useState } from "react";

const Home = () => {
  const [selectedTrip, setSelectedTrip] = useState("Italy");

  return (
    <div className="home px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
      <h1 className="mt-8 text-xl sm:text-2xl text-center">Where Are You Going Next?</h1>
      <div className="mt-4 mb-10 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 text-base sm:text-lg border-2 bg-neutral-200 border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 placeholder-gray-700"
        />
      </div>
      <div className="border border-gray-300 rounded-lg p-4 max-w-lg mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">My Trips</h2>
        <select
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
          className="w-full p-3 text-base sm:text-lg border-2 bg-neutral-200 border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
        >
          <option value="Italy">Italy</option>
          <option value="NYC">NYC</option>
          <option value="Maine">Maine</option>
          <option value="Paris">Paris</option>
        </select>

        <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-base sm:text-lg font-semibold text-center">{selectedTrip}</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
            {selectedTrip === "Italy" && "Enjoy the beautiful architecture and rich history of Italy!"}
            {selectedTrip === "NYC" && "Experience the vibrant life of New York City!"}
            {selectedTrip === "Maine" && "Discover the scenic coastlines and delicious seafood of Maine!"}
            {selectedTrip === "Paris" && "Visit the iconic landmarks and cafés of Paris!"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
