import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-dark position-absolute w-100">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hair Salon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/clients">
              Clientes
            </Nav.Link>
            <Nav.Link as={Link} to="/finances">
              Finanças
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
