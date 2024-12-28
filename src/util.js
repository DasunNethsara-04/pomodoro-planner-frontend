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

export { verifyToken }