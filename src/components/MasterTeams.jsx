import { Form, FormSelect } from 'react-bootstrap'

const MasterTeams = () => {
  return (
    <>
      <Form.Select style={{ borderRadius: '20px' }}>
        <option value="">HC-NZ RU/SA/EM</option>
        <option value="">HC-NZ DI/PE/PL</option>
        <option value="">HC-NZ HG/SS</option>
        <option value="">HC-NZ B/W</option>
        <option value="">HC-NZ B2/W2</option>
        <option value="">HC-NZ X/Y</option>
        <option value="">HC-NZ OR/AS</option>
        <option value="">HC-NZ SU/MO</option>
        <option value="">HC-NZ US/UM</option>
        <option value="">HC-NZ SWO/SH</option>
      </Form.Select>
    </>
  )
}

export default MasterTeams
