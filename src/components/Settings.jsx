import { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaPen } from 'react-icons/fa'
import user from '../user.webp'
import klingklang from '../klingklang.png'
import kling from '../kling.png'
import klang from '../klang.png'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'

const Settings = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [formData, setFormData] = useState({
    username: username,
    email: email,
    password: password,
  })

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
        throw new Error('Error')
      }

      const userData = await response.json()
      setUsername(userData.username)
      setEmail(userData.email)

      setFormData({
        username: userData.username,
        email: userData.email,
        password: '',
      })
    } catch (error) {
      console.error('Error retrieving user data:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userId = getUserIdFromToken()
    if (!userId) return

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: 'PUT',
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

      Swal.fire({
        title: 'Dati aggiornati!',
        text: 'Le modifiche sono state salvate con successo.',
        imageUrl: 'https://media.tenor.com/Jx41K1VQdJkAAAAj/pikachu-jump.gif',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        background: '#f8f9fa',
      })
      const updatedUserData = await response.json()
      setFormData({
        username: updatedUserData.username,
        email: updatedUserData.email,
        password: '',
      })
    } catch (error) {
      console.error('Errore nell’aggiornamento dei dati:', error)
      Swal.fire({
        title: 'Errore!',
        text: 'Si è verificato un errore durante il salvataggio.',
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
              className="p-4 shadow-lg rounded-4"
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
                <div className="position-absolute top-0 start-0 translate-middle">
                  <img width="100px" src={kling} alt="kling" />
                </div>
              </div>
              <div className="position-relativa">
                <div className="position-absolute top-0 start-50 translate-middle">
                  <img width="100px" src={klang} alt="klang" />
                </div>
              </div>
              <div className="position-relative">
                <div className="position-absolute top-0 start-100 translate-middle">
                  <img src={klingklang} width="180px" alt="kling klang" />
                </div>
              </div>
              <div className="text-center mb-3">
                <div className="position-relative d-inline-block">
                  <img
                    src={user}
                    className="rounded-circle"
                    width="130px"
                    alt="User-pic"
                  />
                  <FaPen className="pen-icon pen text-info" />
                </div>

                <h4 className="mt-3 text-light">{formData.username}</h4>
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
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="secondary"
                    className="ps-5 pe-5"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
