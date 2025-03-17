import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the initial position
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });

      // Watch for position updates
      const watchId = navigator.geolocation.watchPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });

      // Cleanup
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" ,marginTop:"2.2rem"}}>
     
      {currentPosition ? (
        <>
       
          {/* OpenStreetMap using Leaflet */}
          <MapContainer
            center={currentPosition}
            zoom={15}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentPosition}>
              <Popup>You are here! 📍</Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LiveTracking;
