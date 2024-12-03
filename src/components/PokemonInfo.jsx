import { Button, Card, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Stats from './Stats'

const Pokemon = ({ data, onRandomClick }) => {
  return (
    <>
      <Col className="mt-5">
        <Card
          style={{
            width: '18rem',
            height: '35rem',
            border: '2px solid black',
          }}
          className="m-3"
        >
          <Card.Img
            style={{ height: '10rem', objectFit: 'contain' }}
            variant="top"
            src={data.sprite}
          />
          <Card.Body>
            <Card.Title className="text-center">
              {' '}
              {data.name.toUpperCase()}
            </Card.Title>
            <Card.Text>
              <Stats data={data} />
            </Card.Text>
            <Card.Text>
              <strong className="">Abilities:</strong>{' '}
              {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
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
      </Col>
      <Col className="mt-5">
        <Card
          style={{
            width: '18rem',
            height: '35rem',
            border: '2px solid black',
          }}
          className="m-3"
        >
          <Card.Img
            style={{ height: '10rem', objectFit: 'contain' }}
            variant="top"
            src={data.sprite}
          />
          <Card.Body>
            <Card.Title className="text-center">
              {data.name.toUpperCase()}
            </Card.Title>
            <Card.Text>
              <strong>Height:</strong> {data.height / 10} m <br />
              <strong>Weight:</strong> {data.weight / 10} kg
            </Card.Text>
            <Card.Text>
              <strong className="">Abilities:</strong>{' '}
              {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
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
      </Col>
      <Col className="mt-5">
        <Card
          style={{
            width: '18rem',
            height: '35rem',
            border: '2px solid black',
          }}
          className="m-3"
        >
          <Card.Img
            style={{ height: '10rem', objectFit: 'contain' }}
            variant="top"
            src={data.sprite}
          />
          <Card.Body>
            <Card.Title className="text-center">
              {data.name.toUpperCase()}
            </Card.Title>
            <Card.Text>
              <strong>Height:</strong> {data.height / 10} m <br />
              <strong>Weight:</strong> {data.weight / 10} kg
            </Card.Text>
            <Card.Text>
              <strong className="">Abilities:</strong>{' '}
              {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
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
      </Col>
      <Col>
        <Card
          style={{
            width: '18rem',
            height: '35rem',
            border: '2px solid black',
          }}
          className="m-3"
        >
          <Card.Img
            style={{ height: '10rem', objectFit: 'contain' }}
            variant="top"
            src={data.sprite}
          />
          <Card.Body>
            <Card.Title className="text-center">
              {data.name.toUpperCase()}
            </Card.Title>
            <Card.Text>
              <strong>Height:</strong> {data.height / 10} m <br />
              <strong>Weight:</strong> {data.weight / 10} kg
            </Card.Text>
            <Card.Text>
              <strong className="">Abilities:</strong>{' '}
              {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
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
      </Col>
      <Col>
        <Card
          style={{
            width: '18rem',
            height: '35rem',
            border: '2px solid black',
          }}
          className="m-3"
        >
          <Card.Img
            style={{ height: '10rem', objectFit: 'contain' }}
            variant="top"
            src={data.sprite}
          />
          <Card.Body>
            <Card.Title className="text-center">
              {data.name.toUpperCase()}
            </Card.Title>
            <Card.Text>
              <strong>Height:</strong> {data.height / 10} m <br />
              <strong>Weight:</strong> {data.weight / 10} kg
            </Card.Text>
            <Card.Text>
              <strong className="">Abilities:</strong>{' '}
              {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
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
      </Col>
      <Col>
        <Card
          style={{
            width: '18rem',
            height: '35rem',
            border: '2px solid black',
          }}
          className="m-3"
        >
          <Card.Img
            style={{ height: '10rem', objectFit: 'contain' }}
            variant="top"
            src={data.sprite}
          />
          <Card.Body>
            <Card.Title className="text-center">
              {data.name.toUpperCase()}
            </Card.Title>
            <Card.Text>
              <strong>Height:</strong> {data.height / 10} m <br />
              <strong>Weight:</strong> {data.weight / 10} kg
            </Card.Text>
            <Card.Text>
              <strong className="">Abilities:</strong>{' '}
              {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
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
      </Col>
    </>
  )
}

export default Pokemon
