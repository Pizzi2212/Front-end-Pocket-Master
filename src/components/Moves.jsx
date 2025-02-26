import { Form, FormSelect } from 'react-bootstrap'

const MoveSelect = ({ data, useLocation }) => {
  return (
    <>
      <div
        style={{ marginTop: useLocation === '/masterTeams' ? '4vh' : '0' }}
        className="d-flex"
      >
        <Form.Select className="me-2 mb-2" style={{ borderRadius: '20px' }}>
          {data.moves.map((e, index) => (
            <option key={index}>{e.toUpperCase()}</option>
          ))}
        </Form.Select>

        <Form.Select className="ms-2 mb-2" style={{ borderRadius: '20px' }}>
          {data.moves.map((e, index) => (
            <option key={index}>{e.toUpperCase()}</option>
          ))}
        </Form.Select>
      </div>

      <div className="d-flex">
        <Form.Select className="me-2 mb-2" style={{ borderRadius: '20px' }}>
          {data.moves.map((e, index) => (
            <option key={index}>{e.toUpperCase()}</option>
          ))}
        </Form.Select>
        <Form.Select className="ms-2 mb-2" style={{ borderRadius: '20px' }}>
          {data.moves.map((e, index) => (
            <option key={index}>{e.toUpperCase()}</option>
          ))}
        </Form.Select>
      </div>
    </>
  )
}

export default MoveSelect
