import { Button, Card } from 'react-bootstrap'

const Pokemon = ({ data, onRandomClick }) => {
  return (
    <Card
      style={{
        width: '18rem',
        height: '40rem',
        border: '2px solid black',
      }}
      className="m-3"
    >
      <Card.Img
        style={{ height: '22rem', objectFit: 'contain' }}
        variant="top"
        src={data.sprite}
      />
      <Card.Body>
        <Card.Title>{data.name.toUpperCase()}</Card.Title>
        <Card.Text>
          <strong>Height:</strong> {data.height / 10} m <br />
          <strong>Weight:</strong> {data.weight / 10} kg
        </Card.Text>
        <Card.Text>
          <strong className="">Abilities:</strong>{' '}
          {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
        </Card.Text>
        <Button className="mt-4" variant="primary" onClick={onRandomClick}>
          Get random Pokémon
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Pokemon
