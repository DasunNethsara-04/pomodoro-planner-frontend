import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavigation from "../Nav/AdminNavigation";
import { Container, Form, Table } from "react-bootstrap";
import { RiFileEditLine } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const ShowTodo = () => {

    const [todos, setTodos] = useState([]);

    const [editId, setEditId] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDueDate, setEditDueDate] = useState("");
    const [editTodoStatus, setEditTodoStatus] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const fetchTodos = async () => {
            // Fetch all todos
            const response = await axios.get("http://127.0.0.1:8000/api/todos", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                setTodos(response.data.todos);
            } else {
                console.error("An error occurred while fetching todos");
            }
        };
        fetchTodos();
    }, []);

    const fetchTodoById = async (id) => {
        setEditId(id);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/todo/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                setEditTitle(response.data.todo.title);
                setEditDescription(response.data.todo.description);
                setEditDueDate(response.data.todo.dueDate);
                setEditTodoStatus(response.data.todo.completed);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditButton = (todo) => {
        const handleShow = () => setShow(true);
        handleShow();
        fetchTodoById(todo.id);
    }

    const handleEditTodoForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", editTitle);
        formData.append("description", editDescription);
        formData.append("dueDate", editDueDate);
        formData.append("status", editTodoStatus);

        // send the data to the fastapi backend
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/todo/${editId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            if (response.data.success) {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.href = "/todo/show";
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while processing your request',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <>
            <AdminNavigation />
            <Container className="mt-4">
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
                                        <button
                                            className="btn-sm btn btn-outline-warning"
                                            onClick={() => handleEditButton(todo)}
                                        >
                                            <RiFileEditLine />
                                        </button>
                                        <button className="ms-2 btn-sm btn btn-outline-danger">
                                            <FaTrashCan />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <div className="model" style={{ display: "block", position: "initial" }}>
                <div
                    className="model"
                    style={{ display: "block", position: "initial" }}
                >
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Todo</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleEditTodoForm}>
                            <Modal.Body>
                                <Form.Group controlId="editTitle" className="mb-3">
                                    <Form.Label>Todo Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Buy food"
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        value={editTitle}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editDescription" className="mb-3">
                                    <Form.Label>Todo Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        value={editDescription}
                                        placeholder="Buy some food from supermarket for dinner"
                                    />
                                </Form.Group>
                                <Form.Group controlId="editDueDate" className="mb-3">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        onChange={(e) => setEditDueDate(e.target.value)}
                                        value={editDueDate}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Done?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Yes"
                                        name="done"
                                        value="1"
                                        checked={editTodoStatus === true}
                                        onChange={(e) => setEditTodoStatus(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="No"
                                        name="done"
                                        value="0"
                                        checked={editTodoStatus === false}
                                        onChange={(e) => setEditTodoStatus(e.target.value)}
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="warning" type="submit">
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default ShowTodo;
