import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const Stats = ({ data }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Show Stats
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.name.toUpperCase()} Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Height:</strong> {data.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {data.weight / 10} kg
          </p>
          <hr />
          <h5>Base Stats</h5>
          {data.stats && data.stats.length > 0 ? (
            data.stats.map((stat, index) => (
              <p key={index}>
                <strong>{stat.name}:</strong> {stat.value}
              </p>
            ))
          ) : (
            <p>No stats available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => alert('Changes saved!')}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Stats
