import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNavigation from '../Nav/AdminNavigation';
import { Container, Table } from 'react-bootstrap';
import { RiFileEditLine } from 'react-icons/ri';
import { FaTrashCan } from 'react-icons/fa6';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ShowTodo = () => {

    const [todos, setTodos] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
            <Container className='mt-4'>
                <h1 className="display-6">Todos</h1>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.dueDate}</td>
                                    <td>
                                        <button className="btn-sm btn btn-outline-warning" onClick={handleShow}><RiFileEditLine /></button>
                                        <button className="ms-2 btn-sm btn btn-outline-danger"><FaTrashCan /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>



            <div className="model" style={{ display: 'block', position: 'initial' }} show={show} onHide={handleClose}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ShowTodo