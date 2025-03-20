import React from 'react'
import { Card, Accordion } from 'react-bootstrap'
import professorOak from '../professorOak.png'
import { FaZ } from 'react-icons/fa6'
import { useEffect } from 'react'

const QnA = () => {
  const [faqData, setFaqData] = React.useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/faq')
      .then((response) => response.json())
      .then((data) => setFaqData(data))
      .catch((error) => console.error('Error fetching FAQs:', error))
  }, [])
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card
        className="shadow-lg"
        style={{
          maxWidth: '1100px',
          maxHeight: '500px',
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card.Header
          style={{
            borderRadius: '20px 20px 0 0',
          }}
          className="text-center"
        >
          <h2 className="mb-0">Q&A</h2>
        </Card.Header>

        <Card.Body
          className="d-flex flex-column"
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            direction: 'column-reverse',
            zIndex: 0,
          }}
        >
          <Accordion>
            {faqData.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>

        <Card.Footer>
          <div className="position-relative">
            <div className="d-lg-block d-none position-absolute start-100 top-50 translate-middle">
              <img width="250px" src={professorOak} alt="" />
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default QnA
