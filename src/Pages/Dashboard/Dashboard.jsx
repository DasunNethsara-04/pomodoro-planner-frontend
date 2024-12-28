import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://127.0.0.1:8000/auth/verify-token/${token}`);
                if (response.status !== 200) {
                    throw new Error("Invalid Token");
                }
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/login");
                if (error.response) {
                    console.error("Server Error: " + error.response.data);
                } else if (error.request) {
                    console.error("Request Error: " + error.request);
                } else {
                    console.error("Unexpected Error: " + error.message);
                }
            }
        }

        verifyToken();
    }, [navigate])
    return (
        <>
            <h1>Welcome to Pomodoro Planner Dashboard</h1>
        </>
    )
}

export default Dashboard