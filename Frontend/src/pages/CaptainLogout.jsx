import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("captain-token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");

          toast.success("Logged out successfully!");

          navigate("/captain-login");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);

        toast.error("Failed to logout. Try again!", { position: "top-right" });

        navigate("/captain-login");
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
