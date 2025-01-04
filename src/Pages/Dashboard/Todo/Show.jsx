import React, { useEffect, useState } from 'react'
import AdminNavigation from '../Nav/AdminNavigation';
import axios from 'axios';
const ShowTodo = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            // Fetch all todos
            const response = await axios.get("http://127.0.0.1:8000/api/todos", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                console.log(response.data.todos);
                setTodos(response.data.todos);
            } else {
                console.error("An error occurred while fetching todos");
            }
        }
        fetchTodos();
    }, [])
    return (
        <>
            <AdminNavigation />
            Show Todo
        </>
    )
}

export default ShowTodo