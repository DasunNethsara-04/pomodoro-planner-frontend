import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";

const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/verify-token/${token}`);
        return response.status === 200;
    } catch (error) {
        localStorage.removeItem("token");
        return false;
    }
}

const Protected = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const result = await verifyToken();
            setIsAuthorized(result)
        };
        checkAuth();
    }, []);


    return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
}


export default Protected;