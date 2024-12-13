import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const [message, setMessage] = useState();

  useEffect(() => {
    // Show loading modal
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // Fetch data
    axios
      .get("https://api-pomodoroplanner.vercel.app/")
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch data. Please try again.", "error");
      })
      .finally(() => {
        // Close loading modal
        Swal.close();
      });
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <NavBar />
      <h2>{message}</h2>
    </>
  );
};

export default Home;
