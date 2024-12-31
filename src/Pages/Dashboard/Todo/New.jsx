import React from 'react'
import AdminNavigation from '../Nav/AdminNavigation';
import { Button, Container, Form } from 'react-bootstrap';

const NewTodo = () => {
    return (
        <>
            <AdminNavigation />
            <Container className='mt-4'>
                <h1 className='display-6'>New Todo</h1>
                {/* Todo Form */}
                <Form className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
                    <Form.Group id='title' className='mb-3'>
                        <Form.Label>Todo Title</Form.Label>
                        <Form.Control type='text' name='title' placeholder='Buy food' required />
                    </Form.Group>
                    <Form.Group id='description' className='mb-3'>
                        <Form.Label>Todo Description</Form.Label>
                        <Form.Control as="textarea" name='description' placeholder='Buy some food from supermarket for dinner' />
                    </Form.Group>
                    <Form.Group id='dueDate' className='mb-3'>
                        <Form.Label>Todo Title</Form.Label>
                        <Form.Control type='date' name='dueDate' required />
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