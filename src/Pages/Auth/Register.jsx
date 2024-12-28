import React, { useState } from 'react'
import NavBar from '../../Components/NavBar'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("password", password);

    setLoading(true);
    // https://api-pomodoroplanner.vercel.app/auth/
    axios.post("https://api-pomodoroplanner.vercel.app/auth/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      setLoading(false);
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.access_token);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account created successfully'
        }).then(() => {
          navigate("/dashboard");
        })
      } else {
        console.error("Unexpected response:", response);
      }
    }).catch(err => {
      setLoading(false);
      console.error(err);
      Swal.fire("Error", err.response.data.detail, "error");
    });
  }

  return (
    <>
      {/* {
        loading &&
        Swal.fire({
          title: 'Loading...',
          text: 'Please wait',
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading()
          }
        })
      }
      {
        error &&
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        })
      } */}

      <NavBar />
      <Container className='position-absolute top-50 start-50 translate-middle'>
        <div>
          <Card>
            <Card.Header><h1 className='text-center'>Register</h1></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Form.Group id='fname' className='mb-3'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type='text' name='firstName' onChange={(e) => setFirstName(e.target.value)} required />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group id='lname' className='mb-3'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type='text' name='lastName' onChange={(e) => setLastName(e.target.value)} required />
                    </Form.Group>
                  </Col>

                  <Col md="6">
                    <Form.Group id='email' className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' name='username' onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group id='password' className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' name='password' onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group id='confirmPassword' className='mb-3'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type='password' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} required />
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