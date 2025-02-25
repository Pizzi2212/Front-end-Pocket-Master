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
import { div } from 'framer-motion/client'
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
            title={
              <div className="d-flex align-items-center">
                <img
                  src={user}
                  className="user"
                  width="60px"
                  alt="User"
                  style={{
                    borderRadius: '50%',
                    border: '2px solid #007bff',
                    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)',
                    cursor: 'pointer',
                  }}
                />
                <span
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px',
                  }}
                  className="ms-3"
                >
                  ashketchum88
                </span>
              </div>
            }
            id="basic-nav-dropdown"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              padding: '8px',
              minWidth: '220px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <NavDropdown.Item
              as={Link}
              to="/settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                color: '#333',
                fontWeight: '500',
                borderRadius: '8px',
                transition: '0.3s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = 'rgba(0, 123, 255, 0.1)')
              }
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              <CiSettings style={{ marginRight: '10px', fontSize: '18px' }} />
              Settings
            </NavDropdown.Item>

            <NavDropdown.Item
              href="#action/3.2"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                color: '#333',
                fontWeight: '500',
                borderRadius: '8px',
                transition: '0.3s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = 'rgba(0, 123, 255, 0.1)')
              }
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              <FcAssistant style={{ marginRight: '10px', fontSize: '18px' }} />
              Assistance
            </NavDropdown.Item>

            <NavDropdown.Item
              href="#action/3.3"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                color: '#333',
                fontWeight: '500',
                borderRadius: '8px',
                transition: '0.3s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = 'rgba(0, 123, 255, 0.1)')
              }
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              <FaPeopleGroup
                style={{ marginRight: '10px', fontSize: '18px' }}
              />
              Community
            </NavDropdown.Item>

            <NavDropdown.Divider
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                margin: '6px 0',
              }}
            />

            <NavDropdown.Item
              as={Link}
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                color: '#d9534f',
                fontWeight: '500',
                borderRadius: '8px',
                transition: '0.3s ease-in-out',
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = 'rgba(217, 83, 79, 0.1)')
              }
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              <CiLogout style={{ marginRight: '10px', fontSize: '18px' }} />
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

// const [username, setUsername] = useState(null);

// useEffect(() => {
// Fai una richiesta alla tua API per ottenere i dati dell'utente
// fetch("/api/user")
// .then((response) => response.json())
//.then((data) => setUsername(data.username)); // Assumendo che l'API ritorni { username: 'Nome Utente' }
//}, []);

export default MyNav
