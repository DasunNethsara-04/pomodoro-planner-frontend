import React from 'react'
import NavBar from '../../Components/NavBar'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <NavBar />
      <Container className='position-absolute top-50 start-50 translate-middle'>
        <div>
          <Card>
            <Card.Header><h1 className='text-center'>Login</h1></Card.Header>
            <Card.Body>
              <Form>
                <Form.Group id='email' className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' required />
                </Form.Group>
                <Form.Group id='password' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' required />
                </Form.Group>
                <Button type='submit' className='w-100'>Login</Button>
              </Form>
              <div className='w-100 text-center mt-2'>
                Don't have an account? <Link to='/register'>Register</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default Login