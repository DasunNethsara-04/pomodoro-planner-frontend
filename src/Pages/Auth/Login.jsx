import React, { useState } from 'react'
import NavBar from '../../Components/NavBar'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    axios.post("https://api-pomodoroplanner.vercel.app/auth/token", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.access_token);
          navigate("/dashboard");
        } else {
          console.error("Unexpected response:", response);
        }
      }).catch(err => {
        if (err.response.status === 401) {
          Swal.fire("Error", err.response.data.detail, "error");
        }

        console.error(err);
      }
      );
  }

  return (
    <>
      <NavBar />
      <Container className='position-absolute top-50 start-50 translate-middle'>
        <div>
          <Card>
            <Card.Header><h1 className='text-center'>Login</h1></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group id='email' className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group id='password' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' onChange={(e) => setPassword(e.target.value)} required />
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