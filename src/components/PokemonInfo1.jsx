import { Button, Card, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Stats from './Stats'
import normalCard from '../card-normal.png'
import bugCard from '../card-bug.png'
import darkCard from '../card-dark.png'
import dragonCard from '../card-dragon.png'
import electricCard from '../card-electric.png'
import fairyCard from '../card-fairy.png'
import fightCard from '../card-fight.png'
import ghostCard from '../card-ghost.png'
import grassCard from '../card-grass.png'
import iceCard from '../card-ice.png'
import poisonCard from '../card-poison.png'
import psychicCard from '../card-psychic.jpg'
import rockCard from '../card-rock.png'
import steelCard from '../card-steel.png'
import waterCard from '../card-water.png'
import fireCard from '../card-fire.png'
import MoveSelect from './Moves'

const Pokemon = ({ data, onRandomClick }) => {
  const includesType = (types, targetTypes) =>
    Array.isArray(types) && types.some((type) => targetTypes.includes(type))

  const psychic = includesType(data.types, ['psychic'])
  const ghost = includesType(data.types, ['ghost'])
  const fire = includesType(data.types, ['fire'])
  const water = includesType(data.types, ['water'])
  const ice = includesType(data.types, ['ice'])
  const poison = includesType(data.types, ['poison'])
  const electric = includesType(data.types, ['electric'])
  const fight = includesType(data.types, ['fighting'])
  const rock = includesType(data.types, ['ground', 'rock'])
  const grass = includesType(data.types, ['grass'])
  const bug = includesType(data.types, ['bug'])
  const dark = includesType(data.types, ['dark'])
  const steel = includesType(data.types, ['steel'])
  const fairy = includesType(data.types, ['fairy'])
  const normal = includesType(data.types, ['normal'])
  const dragon = includesType(data.types, ['dragon'])

  const modalBackgroundImage = psychic
    ? `url(${psychicCard})`
    : ghost
    ? `url(${ghostCard})`
    : fire
    ? `url(${fireCard})`
    : ice
    ? `url(${iceCard})`
    : water
    ? `url(${waterCard})`
    : electric
    ? `url(${electricCard})`
    : fight
    ? `url(${fightCard})`
    : poison
    ? `url(${poisonCard})`
    : grass
    ? `url(${grassCard})`
    : rock
    ? `url(${rockCard})`
    : bug
    ? `url(${bugCard})`
    : dark
    ? `url(${darkCard})`
    : steel
    ? `url(${steelCard})`
    : fairy
    ? `url(${fairyCard})`
    : normal
    ? `url(${normalCard})`
    : dragon
    ? `url(${dragonCard})`
    : 'white'

  const randomBackgroundColor = psychic
    ? '#C81250'
    : fire
    ? 'red'
    : water
    ? '#0094D9'
    : bug
    ? '#545500'
    : ghost
    ? '#4E2093'
    : electric
    ? '#EABD00'
    : poison
    ? '#5B0B63'
    : fight
    ? '#C2590F'
    : grass
    ? 'green'
    : dark
    ? 'black'
    : steel
    ? 'gray'
    : fairy
    ? 'pink'
    : normal
    ? 'lightgray'
    : dragon
    ? '#486FCB'
    : 'white'
  return (
    <>
      <Card
        style={{
          width: '25rem',
          height: '35rem',
          backgroundImage: modalBackgroundImage,
          backgroundSize: 'cover',
        }}
        className="m-3"
      >
        {' '}
        <Card.Title
          className="text-center mt-4 ms-5 pe-5  fs-5"
          style={{
            color:
              data.types && data.types.includes('dark') ? 'white' : 'black',
          }}
        >
          {' '}
          {data.name.toUpperCase()}
        </Card.Title>
        <Card.Img
          style={{ height: '14rem', objectFit: 'contain' }}
          variant="top"
          src={data.sprite}
        />
        <Card.Body className="cardBody">
          <div className="d-flex">
            <Button
              style={{
                backgroundColor: randomBackgroundColor,

                border: '1px solid black',
              }}
              className="mt-4"
              onClick={onRandomClick}
            >
              random
            </Button>
            <input
              placeholder="Cerca il tuo pokèmon "
              className="input-pokemon"
              type="text"
            />
          </div>

          <Card.Text className="text-center  mt-4">
            <Stats data={data} />
          </Card.Text>
          <MoveSelect data={data} />
        </Card.Body>
      </Card>
    </>
  )
}

export default Pokemon
