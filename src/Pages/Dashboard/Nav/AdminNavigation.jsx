import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AdminNavigation() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#home">Pomodoro Planner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#link">Timer</Nav.Link>
                        <NavDropdown title="Todo" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">
                                New Todo
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Show Todos</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link">Statistics</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavigation;