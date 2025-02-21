import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import logo from '../logomm.jpg'
import { useLocation } from 'react-router-dom'
import user from '../user.webp'

function MyNav() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }
  return (
    <Navbar expand="lg" className="nav">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} width="150px" className="me-3" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Brand as={Link} to="/home">
              Home
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/box">
              Box
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/masterTeams">
              Master Teams
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/captured">
              Captured Pokèmon
            </Navbar.Brand>
          </Nav>

          <NavDropdown
            title={<img src={user} alt="" />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Assistance</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Community</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/">
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
