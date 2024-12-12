import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const BoxStats = ({ data }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button onClick={handleShow}>Details</Button>

      <Modal className="my-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {' '}
            <img src={data.sprites.other?.showdown?.front_default} alt="" />
          </Modal.Title>
          <Modal.Title className="ms-5">{data.name.toUpperCase()}</Modal.Title>
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
              <div key={index}>
                <p>
                  <strong>{stat.stat.name.toUpperCase()}:</strong>{' '}
                  {stat.base_stat}
                </p>
              </div>
            ))
          ) : (
            <p>No stats available</p>
          )}
          <p>
            <strong className="fs-4">
              Total: {data.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <strong className="fs-3 me-3">
            Abilities: {data.abilities.map((a) => a.ability.name).join(', ')}
          </strong>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BoxStats
