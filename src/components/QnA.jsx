import React from 'react'
import { Card } from 'react-bootstrap'
import professorOak from '../professorOak.png'

const QnA = () => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card
        className="shadow-lg"
        style={{
          maxWidth: '1100px',
          maxHeight: '700px',
          minHeight: '500px',
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card.Header
          style={{
            borderRadius: '20px 20px 0 0',
          }}
          className="text-white text-center"
        >
          <h2 className="mb-0">Q&A</h2>
        </Card.Header>

        <Card.Body
          className="d-flex flex-column"
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            direction: 'column-reverse',
          }}
          ref={(el) => {
            if (el) el.scrollTop = el.scrollHeight
          }}
        ></Card.Body>

        <Card.Footer>
          <div className="position-relative">
            <div className="position-absolute top-50 start-100 translate-middle">
              <img width="250px" src={professorOak} alt="" />
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default QnA
