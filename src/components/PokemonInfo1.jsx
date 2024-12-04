import { Button, Card, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Stats from './Stats'

const Pokemon = ({ data, onRandomClick }) => {
  return (
    <>
      <Card
        style={{
          width: '25rem',
          height: '35rem',
        }}
        className="m-3"
      >
        {' '}
        <Card.Title className="text-center mt-2 ms-5 pe-5  fs-1">
          {' '}
          {data.name.toUpperCase()}
        </Card.Title>
        <Card.Img
          style={{ height: '12rem', objectFit: 'contain' }}
          variant="top"
          src={data.sprite}
        />
        <Card.Body>
          <Card.Text className="text-center mt-3">
            <Stats data={data} />
          </Card.Text>
          <div className="d-flex">
            <Button
              className="mt-4 random"
              variant="primary"
              onClick={onRandomClick}
            >
              random
            </Button>
            <input
              placeholder="Cerca il tuo pokèmon"
              className="w-75 mt-4 ms-2"
              type="text"
            ></input>
          </div>
          <div className="d-flex mt-4 justify-content-around">
            <DropdownButton id="dropdown-basic-button" title="Mossa 1">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Mossa 2">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="d-flex mt-3 justify-content-around">
            <DropdownButton id="dropdown-basic-button" title="Mossa 3">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Mossa 4">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Pokemon
