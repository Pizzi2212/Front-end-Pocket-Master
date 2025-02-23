import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import logo from '../logoPocketMaster.png'
import { useLocation } from 'react-router-dom'
import user from '../user.webp'
import { CiSettings } from 'react-icons/ci'
import { FcAssistant } from 'react-icons/fc'
import { FaPeopleGroup } from 'react-icons/fa6'
import { CiLogout } from 'react-icons/ci'
function MyNav() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }
  return (
    <Navbar expand="lg" className="nav">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} width="180px" className="me-3" alt="Logo" />
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
            title={<img src={user} className="user" width="90px" alt="" />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/settings">
              Settings <CiSettings className="ms-3" />
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Assistance <FcAssistant />
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Community <FaPeopleGroup />
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/">
              Log out <CiLogout className="ms-3" />
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
