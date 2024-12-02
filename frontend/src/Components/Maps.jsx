import React, { useEffect, useRef } from "react";

const Map = ({ coordinates }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!coordinates || !mapRef.current) return;

        const [lat, lng] = coordinates.split(",").map(Number);

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 12,
        });

        new window.google.maps.Marker({
            position: { lat, lng },
            map,
        });
    }, [coordinates]);

    return <div ref={mapRef} style={{ height: "300px", width: "400px" }}></div>;
};

export default Map;
