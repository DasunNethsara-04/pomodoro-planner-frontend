import React from 'react'
import NavBar from '../../Components/NavBar'

const Login = () => {
  return (
    <>
      <NavBar />
      <NavBar />
      <Container className='position-absolute top-50 start-50 translate-middle'>
        <div>
          <Card>
            <Card.Header><h1 className='text-center'>Login</h1></Card.Header>
            <Card.Body>
              <Form>
                <Row>
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
                </Row>
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