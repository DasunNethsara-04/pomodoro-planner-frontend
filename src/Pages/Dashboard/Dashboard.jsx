import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../../util'

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verifyToken();
    }, [navigate]);


    return (
        <>
            <h1>Welcome to Pomodoro Planner Dashboard</h1>
        </>
    )
}

export default Dashboard