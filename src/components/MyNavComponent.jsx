import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import logo from '../logoPocketMaster.png'
import { useLocation } from 'react-router-dom'
import userIcon from '../user.webp'
import { CiSettings } from 'react-icons/ci'
import { FaQuestion } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import { CiLogout } from 'react-icons/ci'
import { div } from 'framer-motion/client'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import avatar1 from '../avatar1.png'
import Music from './Music'

function MyNav({ username, userAvatar }) {
  const location = useLocation()

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
      const decodedToken = jwtDecode(token)
      return decodedToken.id
    } catch (error) {
      console.error('Errore nella decodifica del token:', error)
      return null
    }
  }

  const fetchUserData = async () => {
    const userId = getUserIdFromToken()
    if (!userId) return

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error("Errore nel recupero dell'utente")
      }

      const userData = await response.json()
    } catch (error) {
      console.error('Errore nel recupero dati utente:', error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken()
      if (!userId) return

      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Error fetching user data')
        }

        const userData = await response.json()
        console.log('Data fetched:', userData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  if (location.pathname === '/') {
    return null
  }

  return (
    <Navbar expand="xxl" className="nav">
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
            <Navbar.Brand as={Link} to="/masterChat">
              Master Chat
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/captured">
              Captured Pokèmon
            </Navbar.Brand>
            <NavDropdown
              className="align-items-center mt-1"
              title="🎵Music"
              id="music-dropdown"
            >
              <NavDropdown.Item className="music" as="div">
                <Music />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <NavDropdown
            title={
              <div className="d-flex flex-column align-items-center">
                <img
                  src={userAvatar || avatar1}
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
                <h4 className="text-center text-light mt-3">
                  {username ? username : 'Loading...'}
                </h4>
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
              as={Link}
              to="/QnA"
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
              <FaQuestion style={{ marginRight: '10px', fontSize: '18px' }} />
              Q&A
            </NavDropdown.Item>

            <NavDropdown.Item
              as={Link}
              to="/community"
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
              onClick={() => localStorage.removeItem('token')}
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

export default MyNav
