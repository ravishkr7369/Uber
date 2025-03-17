// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import CaptainDetails from "../components/CaptainDetails";
// import RidePopUp from "../components/RidePopUp";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
// import { useEffect, useContext } from "react";
// import { SocketContext } from "../context/socketContext";
// import { CaptainDataContext } from "../context/captainContext";
// import axios from "axios";
// import LiveTracking from "../components/LiveTracking";

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false);
//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

//   const ridePopupPanelRef = useRef(null);
//   const confirmRidePopupPanelRef = useRef(null);
//   const [ride, setRide] = useState(null);

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(CaptainDataContext);

//   useEffect(() => {
//     socket.emit("join", {
//       userId: captain._id,
//       userType: "captain",
//     });
//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           socket.emit("update-location-captain", {
//             userId: captain._id,
//             location: {
//               ltd: position.coords.latitude,
//               lng: position.coords.longitude,
//             },
//           });
//         });
//       }
//     };

//     const locationInterval = setInterval(updateLocation, 10000);
//     updateLocation();

//     // return () => clearInterval(locationInterval)
//   }, []);

//   socket.on("new-ride", (data) => {
//     setRide(data);
//     setRidePopupPanel(true);
//   });

//   async function confirmRide() {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
//       {
//         rideId: ride._id,
//         captainId: captain._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     setRidePopupPanel(false);
//     setConfirmRidePopupPanel(true);
//   }

//   useGSAP(
//     function () {
//       if (ridePopupPanel) {
//         gsap.to(ridePopupPanelRef.current, {
//           transform: "translateY(0)",
//         });
//       } else {
//         gsap.to(ridePopupPanelRef.current, {
//           transform: "translateY(100%)",
//         });
//       }
//     },
//     [ridePopupPanel]
//   );

//   useGSAP(
//     function () {
//       if (confirmRidePopupPanel) {
//         gsap.to(confirmRidePopupPanelRef.current, {
//           transform: "translateY(0)",
//         });
//       } else {
//         gsap.to(confirmRidePopupPanelRef.current, {
//           transform: "translateY(100%)",
//         });
//       }
//     },
//     [confirmRidePopupPanel]
//   );

//   // return (
//   //  <div className="h-screen">
//   //     <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
//   //       <img
//   //         className="w-16"
//   //         src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//   //         alt=""
//   //       />
//   //       <Link
//   //         to="/captain/logout"
//   //         className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
//   //       >
//   //         <i className="text-lg font-medium ri-logout-box-r-line"></i>
//   //       </Link>
//   //     </div>
//   //     <div className="h-3/5">
//   //       {/* <img
//   //         className="h-full w-full object-cover"
//   //         src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//   //         alt=""
//   //       /> */}
//   //       <LiveTracking/>
//   //     </div>
//   //     <div className="h-2/5 p-6">
//   //       <CaptainDetails />
//   //     </div>
//   //     <div
//   //       ref={ridePopupPanelRef}
//   //       className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
//   //     >
//   //       <RidePopUp
//   //         ride={ride}
//   //         setRidePopupPanel={setRidePopupPanel}
//   //         setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//   //         confirmRide={confirmRide}
//   //       />
//   //     </div>
//   //     <div
//   //       ref={confirmRidePopupPanelRef}
//   //       className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
//   //     >
//   //       <ConfirmRidePopUp
//   //         ride={ride}
//   //         setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//   //         setRidePopupPanel={setRidePopupPanel}
//   //       />
//   //     </div>
//   //   </div>

    
//   // );




// };

// export default CaptainHome;





import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/socketContext";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain]);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => socket.off("new-ride");
  }, [socket]);

  async function confirmRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride?._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      y: ridePopupPanel ? 0 : "100%",
      duration: 0.3,
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      y: confirmRidePopupPanel ? 0 : "100%",
      duration: 0.3,
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen relative">
      {/* Header (Uber Logo & Logout Button) */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-transparent p-4 z-50">
        <img
          className="w-16 h-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain/logout"
          className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full shadow-lg"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map Section */}
      <div className="h-3/5 relative z-10">
        <LiveTracking />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Pop-up Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 w-full bg-white px-3 py-10 pt-12 z-20 translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Pop-up Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 w-full h-screen bg-white px-3 py-10 pt-12 z-20 translate-y-full"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
