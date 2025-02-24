import { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaPen } from 'react-icons/fa'
import user from '../user.webp'
import klingklang from '../klingklang.png'

const Settings = () => {
  const [formData, setFormData] = useState({
    username: 'ashketchum88',
    email: 'ash.ketchum@kanto.com',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saved data:', formData)
    alert('Changes saved!')
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
            <Card className="p-4 shadow-lg rounded-4">
              <div className="position-relative">
                <div className="position-absolute top-0 start-100 translate-middle">
                  <img src={klingklang} width="130px" alt="" />
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

                <h4 className="mt-3">{formData.username}</h4>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Save
                </Button>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
