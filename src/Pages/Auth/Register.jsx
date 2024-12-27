import React from 'react'
import NavBar from '../../Components/NavBar'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <>
      <NavBar />
      <Container className='position-absolute top-50 start-50 translate-middle'>
        <div>
          <Card>
            <Card.Header><h1 className='text-center'>Register</h1></Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md="6">
                    <Form.Group id='fname' className='mb-3'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type='text' name='firstName' required />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group id='lname' className='mb-3'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type='text' name='lastName' required />
                    </Form.Group>
                  </Col>

                  <Col md="6">
                    <Form.Group id='email' className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' name='email' required />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group id='password' className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' name='password' required />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group id='confirmPassword' className='mb-3'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type='password' name='confirmPassword' required />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type='submit' className='w-100'>Register</Button>
              </Form>
              <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Log In</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default Register