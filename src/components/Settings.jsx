import { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaPen } from 'react-icons/fa'
import klingklang from '../klingklang.png'
import kling from '../kling.png'
import klang from '../klang.png'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux'
import avatar1 from '../avatar1.png'
import avatar2 from '../avatar2.png'
import avatar3 from '../avatar3.png'
import avatar4 from '../avatar4.png'
import avatar5 from '../avatar5.png'
import avatar6 from '../avatar6.png'
import avatar7 from '../avatar7.png'
import avatar8 from '../avatar8.png'
import avatar9 from '../avatar9.png'
import avatar10 from '../avatar10.png'
import avatar11 from '../avatar11.png'
import avatar12 from '../avatar12.png'
import avatar13 from '../avatar13.png'
import avatar14 from '../avatar14.png'
import avatar15 from '../avatar15.png'
import avatar16 from '../avatar16.png'
import avatar17 from '../avatar17.png'
import avatar18 from '../avatar18.png'
import avatar19 from '../avatar19.png'
import avatar20 from '../avatar20.png'
import { Modal } from 'react-bootstrap'

const Settings = ({ setUsername, setAvatar }) => {
  const userId = useSelector((state) => state.auth.userId)
  const token = localStorage.getItem('token')
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
    avatar13,
    avatar14,
    avatar15,
    avatar16,
    avatar17,
    avatar18,
    avatar19,
    avatar20,
  ]
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: avatar1,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || !token) return

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

        if (!response.ok) throw new Error('Error fetching user data')

        const userData = await response.json()
        setUsername(userData.username)

        const savedAvatar = localStorage.getItem(`avatar_${userId}`)
        setFormData({
          username: userData.username,
          email: userData.email,
          password: '',
          avatar: savedAvatar || avatars[userData.avatarId] || avatar1,
        })
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [userId, token, setUsername])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (!userId) return

    const savedAvatar = localStorage.getItem(`avatar_${userId}`)
    if (savedAvatar) {
      setFormData((prevData) => ({ ...prevData, avatar: savedAvatar }))
    }
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId || !token) return

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            avatarId: avatars.indexOf(formData.avatar),
          }),
        }
      )

      if (!response.ok) throw new Error('Error updating user data')

      localStorage.setItem(`avatar_${userId}`, formData.avatar)

      setAvatar(formData.avatar)
      setUsername(formData.username)

      Swal.fire({
        title: 'Updated data!',
        text: 'The changes have been saved successfully.',
        imageUrl: 'https://media.tenor.com/Jx41K1VQdJkAAAAj/pikachu-jump.gif',
        confirmButtonText: 'OK',
      })
    } catch (error) {
      console.error('Errore durante il salvataggio:', error)
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while saving.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const deleteProfile = async (e) => {
    e.preventDefault()

    const sure = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible. Your account will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (!sure.isConfirmed) return
    if (!userId || !token) return

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Error')
      }

      localStorage.removeItem('token')

      Swal.fire({
        title: 'Profile deleted!',
        text: 'We are sorry to see you go...',
        imageUrl:
          'https://preview.redd.it/transparent-gifs-i-made-from-the-pok%C3%A9mon-anime-for-an-v0-1wxi2yjtxb7a1.gif?width=640&crop=smart&auto=webp&s=f1d66edb5e1deb160797b40562caabac8a7aca80',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        background: '#f8f9fa',
      }).then(() => {
        window.location.href = '/'
      })
    } catch (error) {
      console.error('Error updating data:', error)
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while saving.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="p-4 rounded-4 shadow-lg"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage:
                  'linear-gradient(90deg, rgba(41,40,40,1) 25%, rgba(79,76,77,1) 70%, rgba(40,37,37,0.7231267507002801) 92%)',
                opacity: '95%',
                borderRadius: '20px',
              }}
            >
              <div className="position-relativa">
                <div className="position-absolute start-0 top-0 translate-middle">
                  <img width="100px" src={kling} alt="kling" />
                </div>
              </div>
              <div className="position-relativa">
                <div className="position-absolute start-50 top-0 translate-middle">
                  <img width="100px" src={klang} alt="klang" />
                </div>
              </div>
              <div className="position-relative">
                <div className="position-absolute start-100 top-0 translate-middle">
                  <img src={klingklang} width="180px" alt="kling klang" />
                </div>
              </div>
              <div className="text-center mb-3 mt-4">
                <div
                  className="d-inline-block position-relative"
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={formData.avatar}
                    className="rounded-circle"
                    width="140px"
                    alt="User-pic"
                  />
                  <FaPen className="text-info pen pen-icon" />
                </div>
                <h4 className="text-light mt-3">{formData.username}</h4>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-around justify-content-center mt-4">
                  <Button
                    variant="secondary"
                    className="pe-5 ps-5"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={deleteProfile}
                    variant="danger"
                    className="pe-5 ps-5"
                  >
                    Delete
                  </Button>
                </div>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap justify-content-center">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index}`}
                className="m-2 rounded-circle"
                width="80px"
                style={{
                  cursor: 'pointer',
                  border:
                    formData.avatar === avatar ? '3px solid blue' : 'none',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onClick={() => setFormData({ ...formData, avatar })}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Settings
