import React, { useEffect, useState } from 'react'
import AdminNavigation from '../Nav/AdminNavigation';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", dueDate);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/todo/", formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    navigate('/todo/show');
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while processing your request',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    return (
        <>
            <AdminNavigation />
            <Container className='mt-4'>
                <h1 className='display-6'>New Todo</h1>
                {/* Todo Form */}
                <Form className='shadow-lg p-3 mb-5 bg-body-tertiary rounded' onSubmit={handleSubmit}>
                    <Form.Group id='title' className='mb-3'>
                        <Form.Label>Todo Title</Form.Label>
                        <Form.Control type='text' name='title' placeholder='Buy food' onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group id='description' className='mb-3'>
                        <Form.Label>Todo Description</Form.Label>
                        <Form.Control as="textarea" name='description' onChange={(e) => setDescription(e.target.value)} placeholder='Buy some food from supermarket for dinner' />
                    </Form.Group>
                    <Form.Group id='dueDate' className='mb-3'>
                        <Form.Label>Todo Title</Form.Label>
                        <Form.Control type='date' name='dueDate' onChange={(e) => setDueDate(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Button type='submit' variant='primary'>Save</Button>
                        <Button variant='secondary' type='reset' className='ms-2'>Reset</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default NewTodo