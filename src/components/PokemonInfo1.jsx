import { Button, Card, Form } from 'react-bootstrap'
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
import groundCard from '../card-ground.png'
import flyCard from '../card-fly.png'
import MoveSelect from './Moves'
import { GoStarFill } from 'react-icons/go'
import { useState, useEffect } from 'react'

const Pokemon1 = ({ data, onRandomClick, onSearchPokèmon, searchValue }) => {
  const includesType = (types, targetTypes) =>
    Array.isArray(types) && types.some((type) => targetTypes.includes(type))

  const [currrentSprite, setCurrentSprite] = useState(data.sprite)
  const [teraType, setTeraType] = useState('')
  const [currentTypes, setCurrentTypes] = useState(data.types)

  const psychic = includesType(data.types, ['psychic'])
  const ghost = includesType(data.types, ['ghost'])
  const fire = includesType(data.types, ['fire'])
  const water = includesType(data.types, ['water'])
  const ice = includesType(data.types, ['ice'])
  const poison = includesType(data.types, ['poison'])
  const electric = includesType(data.types, ['electric'])
  const fight = includesType(data.types, ['fighting'])
  const rock = includesType(data.types, ['rock'])
  const ground = includesType(data.types, ['ground'])
  const grass = includesType(data.types, ['grass'])
  const bug = includesType(data.types, ['bug'])
  const dark = includesType(data.types, ['dark'])
  const steel = includesType(data.types, ['steel'])
  const fairy = includesType(data.types, ['fairy'])
  const normal = includesType(data.types, ['normal'])
  const flying = includesType(data.types, ['flying'])
  const dragon = includesType(data.types, ['dragon'])

  const typeToBackground = {
    steel: steelCard,
    psychic: psychicCard,
    ghost: ghostCard,
    fire: fireCard,
    ice: iceCard,
    water: waterCard,
    electric: electricCard,
    fighting: fightCard,
    ground: groundCard,
    poison: poisonCard,
    grass: grassCard,
    rock: rockCard,
    bug: bugCard,
    dark: darkCard,
    fairy: fairyCard,
    normal: normalCard,
    dragon: dragonCard,
    flying: flyCard,
  }

  const defaultBackground = teraType
    ? typeToBackground[teraType]
    : typeToBackground[data.types[0]] || ''

  const randomBackgroundColor = teraType
    ? teraType === 'steel'
      ? 'gray'
      : teraType === 'psychic'
      ? '#C81250'
      : teraType === 'ghost'
      ? '#4E2093'
      : teraType === 'fire'
      ? 'red'
      : teraType === 'ice'
      ? '#A4D8D8'
      : teraType === 'water'
      ? '#0094D9'
      : teraType === 'electric'
      ? '#EABD00'
      : teraType === 'fighting'
      ? '#C2590F'
      : teraType === 'ground'
      ? '#A26D00'
      : teraType === 'poison'
      ? '#5B0B63'
      : teraType === 'grass'
      ? 'green'
      : teraType === 'rock'
      ? '#C2590F'
      : teraType === 'bug'
      ? '#545500'
      : teraType === 'dark'
      ? 'black'
      : teraType === 'fairy'
      ? 'pink'
      : teraType === 'normal'
      ? 'lightgray'
      : teraType === 'dragon'
      ? '#486FCB'
      : teraType === 'flying'
      ? '#B2BBD1'
      : 'white'
    : steel
    ? 'gray'
    : psychic
    ? '#C81250'
    : ghost
    ? '#4E2093'
    : fire
    ? 'red'
    : ice
    ? '#A4D8D8'
    : water
    ? '#0094D9'
    : electric
    ? '#EABD00'
    : fight
    ? '#C2590F'
    : ground
    ? '#A26D00'
    : poison
    ? '#5B0B63'
    : grass
    ? 'green'
    : rock
    ? '#C2590F'
    : bug
    ? '#545500'
    : dark
    ? 'black'
    : fairy
    ? 'pink'
    : normal
    ? 'lightgray'
    : dragon
    ? '#486FCB'
    : flying
    ? '#B2BBD1'
    : 'white'

  const shiny = () => {
    setCurrentSprite((prevSprite) =>
      prevSprite === data.sprite ? data.spriteShiny : data.sprite
    )
  }

  useEffect(() => {
    setCurrentSprite(data.sprite)
    setCurrentTypes(data.types)
    setTeraType('')
  }, [data])

  const teraChange = (e) => {
    setTeraType(e.target.value)
  }

  return (
    <>
      <Card
        style={{
          width: '25rem',
          height: '35rem',
          backgroundImage: `url(${defaultBackground})`,
          backgroundSize: 'cover',
        }}
        className="m-3"
      >
        <Card.Title
          className="text-center mt-4 ms-5 pe-5 fs-5"
          style={{
            color:
              data.types && data.types.includes('dark') ? 'white' : 'black',
          }}
        >
          <div className="position-relative">
            <GoStarFill
              className="shiny-star text-primary star"
              onClick={shiny}
            />
          </div>
          <div className="position-relative">
            <Form.Select
              onChange={teraChange}
              value={teraType}
              className="tera"
              style={{ width: '5em', borderRadius: '20px' }}
            >
              <option value="">Tera</option>
              <option value="grass">Grass</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="electric">Electric</option>
              <option value="ground">Ground</option>
              <option value="fighting">Fight</option>
              <option value="rock">Rock</option>
              <option value="dark">Dark</option>
              <option value="psychic">Psychic</option>
              <option value="ghost">Ghost</option>
              <option value="fairy">Fairy</option>
              <option value="steel">Steel</option>
              <option value="dragon">Dragon</option>
              <option value="normal">Normal</option>
              <option value="flying">Flying</option>
              <option value="bug">Bug</option>
              <option value="ice">Ice</option>
              <option value="poison">Poison</option>
            </Form.Select>
          </div>
          {data.name.toUpperCase()}
        </Card.Title>
        <Card.Img
          style={{ height: '14rem', objectFit: 'contain' }}
          variant="top"
          src={currrentSprite}
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
              placeholder="Search Pokémon"
              className="input-pokemon"
              type="text"
              onChange={(e) => onSearchPokèmon(e.target.value)}
              value={searchValue}
            />
          </div>
          <Card.Text className="text-center mt-4">
            <Stats data={data} />
          </Card.Text>
          <MoveSelect data={data} />
        </Card.Body>
      </Card>
    </>
  )
}

export default Pokemon1
