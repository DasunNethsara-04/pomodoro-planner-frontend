import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function AdminNavigation() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/dashboard">Pomodoro Planner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/timer">Timer</Nav.Link>
                        <NavDropdown title="Todo" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/todo/new">
                                New Todo
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/todo/show">
                                Show Todos
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/stat">Statistics</Nav.Link>
                    </Nav>
                    <Button variant='outline-danger'>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavigation;