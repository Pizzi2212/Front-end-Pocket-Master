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
import { useLocation } from 'react-router-dom'
import shinyStar from '../shiny.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import megaEvo from '../Megaevo.webp'
import gmax from '../gmax.webp'
import alola from '../alola.png'
import hisui from '../hisui.png'
import { Dropdown } from 'react-bootstrap'
import tera from '../tera.png'
import teraSteel from '../teraSteel.png'
import teraPsychic from '../teraPsychic.png'
import teraGhost from '../teraGhost.png'
import teraFire from '../teraFire.png'
import teraIce from '../teraIce.png'
import teraWater from '../teraWater.png'
import teraElectric from '../teraElectric.png'
import teraFighting from '../teraFighting.png'
import teraGround from '../teraGround.png'
import teraPoison from '../teraPoison.png'
import teraGrass from '../teraGrass.png'
import teraRock from '../teraRock.png'
import teraBug from '../teraBug.png'
import teraDark from '../teraDark.png'
import teraFairy from '../teraFairy.png'
import teraNormal from '../teraNormal.png'
import teraDragon from '../teraDragon.png'
import teraFlying from '../teraFlying.png'
import megaAnimate from '../megaAnimate.png'
import gmaxAnimate from '../gmaxAnimate.png'
import hisuiAnimate from '../hisuiAnimate.png'

const PokemonCard = ({
  data,
  onRandomClick,
  onSearchPokemon,
  searchValue,
  useLocation,
  description,
}) => {
  const includesType = (types, targetTypes) =>
    Array.isArray(types) && types.some((type) => targetTypes.includes(type))

  const [currentSprite, setCurrentSprite] = useState(data.sprite)
  const [teraType, setTeraType] = useState('')
  const [currentTypes, setCurrentTypes] = useState(data.types)
  const [isMegaAnimating, setIsMegaAnimating] = useState(false)
  const [isGmaxAnimating, setIsGmaxAnimating] = useState(false)
  const [isAlolaAnimating, setIsAlolaAnimating] = useState(false)
  const [isHisuiAnimating, setIsHisuiAnimating] = useState(false)

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
  const typeToTera = {
    steel: teraSteel,
    psychic: teraPsychic,
    ghost: teraGhost,
    fire: teraFire,
    ice: teraIce,
    water: teraWater,
    electric: teraElectric,
    fighting: teraFighting,
    ground: teraGround,
    poison: teraPoison,
    grass: teraGrass,
    rock: teraRock,
    bug: teraBug,
    dark: teraDark,
    fairy: teraFairy,
    normal: teraNormal,
    dragon: teraDragon,
    flying: teraFlying,
  }

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

  const defaultBackground = teraType
    ? typeToBackground[teraType]
    : typeToBackground[data.types[0]] || ''

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
    const selectedType = e.target.value
    setTeraType(selectedType)

    if (selectedType) {
      setCurrentTypes([selectedType])
    } else {
      setCurrentTypes(data.types)
    }
  }

  const megaChange = () => {
    setIsMegaAnimating(true)
    setTimeout(() => {
      setIsMegaAnimating(false)
    }, 1000)
    const form = searchValue + '-mega'
    onSearchPokemon(form)

    if (searchValue === '') {
      onSearchPokemon(data.name + '-mega')
    }

    if (searchValue.includes('-mega')) {
      onSearchPokemon(data.name.replace('-mega', ''))
    }

    if (searchValue === 'charizard' || data.name === 'charizard') {
      onSearchPokemon(data.name + '-mega-y')
    } else if (
      searchValue === 'charizard-mega-y' ||
      data.name === 'charizard-mega-y'
    ) {
      onSearchPokemon('charizard' + '-mega-x')
    } else if (
      searchValue === 'charizard-mega-x' ||
      data.name === 'charizard-mega-x'
    ) {
      onSearchPokemon(data.name.replace('-mega-x', ''))
    }

    if (searchValue === 'mewtwo' || data.name === 'mewtwo') {
      onSearchPokemon(data.name + '-mega-y')
    } else if (searchValue === 'mewtwo-mega-y') {
      onSearchPokemon('mewtwo' + '-mega-x')
    } else if (searchValue === 'mewtwo-mega-x') {
      onSearchPokemon(data.name.replace('-mega-x', '')) && onSearchPokemon('')
    }
  }

  const gmaxChange = () => {
    setIsGmaxAnimating(true)
    setTimeout(() => {
      setIsGmaxAnimating(false)
    }, 1000)
    const form = searchValue + '-gmax'
    onSearchPokemon(form)

    if (searchValue === '') {
      onSearchPokemon(data.name + '-gmax')
    }

    if (searchValue.includes('-gmax')) {
      onSearchPokemon(data.name.replace('-gmax', ''))
    }

    if (searchValue === 'eternatus' || data.name === 'eternatus') {
      onSearchPokemon(data.name + '-eternamax')
    } else if (
      searchValue === 'eternatus-eternamax' ||
      data.name === 'eternatus-eternamax'
    ) {
      onSearchPokemon(data.name.replace('-eternamax', ''))
    }
  }

  const alolaChange = () => {
    setIsAlolaAnimating(true)
    setTimeout(() => {
      setIsAlolaAnimating(false)
    }, 1000)
    const form = searchValue + '-alola'
    onSearchPokemon(form)

    if (searchValue === '') {
      onSearchPokemon(data.name + '-alola')
    }

    if (searchValue.includes('-alola')) {
      onSearchPokemon(data.name.replace('-alola', ''))
    }
  }

  const hisuiChange = () => {
    setIsHisuiAnimating(true)
    setTimeout(() => {
      setIsHisuiAnimating(false)
    }, 1000)
    const form = searchValue + '-hisui'
    onSearchPokemon(form)

    if (searchValue === '') {
      onSearchPokemon(data.name + '-hisui')
    }

    if (searchValue.includes('-hisui')) {
      onSearchPokemon(data.name.replace('-hisui', ''))
    }

    if (searchValue === 'palkia' || data.name === 'palkia') {
      onSearchPokemon(data.name + '-origin')
    } else if (
      searchValue === 'palkia-origin' ||
      data.name === 'palkia-origin'
    ) {
      onSearchPokemon(data.name.replace('-origin', ''))
    }

    if (searchValue === 'dialga' || data.name === 'dialga') {
      onSearchPokemon(data.name + '-origin')
    } else if (
      searchValue === 'dialga-origin' ||
      data.name === 'dialga-origin'
    ) {
      onSearchPokemon(data.name.replace('-origin', ''))
    }

    if (
      searchValue === 'giratina-altered' ||
      data.name === 'giratina-altered'
    ) {
      onSearchPokemon(data.name.replace('-altered', '-origin'))
    } else if (
      searchValue === 'giratina-origin' ||
      data.name === 'giratina-origin'
    ) {
      onSearchPokemon(data.name.replace('-origin', '-altered'))
    }
  }

  return (
    <div>
      <Card
        key={teraType}
        style={{
          width: '25rem',
          height: '35rem',
          backgroundImage: `url(${defaultBackground})`,
          backgroundSize: 'cover',
        }}
        className={`m-3 ${teraType ? 'tera-animation' : ''}`}
      >
        <Card.Title
          className="text-center fs-5 ms-5 mt-4 pe-5"
          style={{
            color:
              (data.types && data.types.includes('dark')) || teraType === 'dark'
                ? 'white'
                : 'black',
          }}
        >
          <div className="position-relative">
            <div className="position-absolute start-0 top-0 translate-middle">
              <img
                style={{ cursor: 'pointer' }}
                width="100vh"
                src={shinyStar}
                onClick={shiny}
                alt=""
              />
            </div>
          </div>
          <div
            className="position-relative"
            style={{
              display: useLocation === '/masterTeams' ? 'none' : 'block',
            }}
          >
            <Dropdown className="tera">
              <Dropdown.Toggle
                style={{
                  width: '5em',
                  borderRadius: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                id="tera-dropdown"
              >
                {teraType ? (
                  <>
                    <img
                      src={typeToTera[teraType]}
                      alt={teraType}
                      style={{ width: '70px', marginRight: '5px' }}
                    />
                    {teraType.charAt(0).toUpperCase() + teraType.slice(1)}
                  </>
                ) : (
                  <img width="70px" src={tera} alt="" />
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => teraChange({ target: { value: '' } })}
                >
                  <img
                    onClick={() => teraChange({ target: { value: '' } })}
                    width="25px"
                    src={tera}
                    alt=""
                  />{' '}
                  Tera
                </Dropdown.Item>
                {Object.keys(typeToTera).map((type) => (
                  <Dropdown.Item
                    key={type}
                    onClick={() => teraChange({ target: { value: type } })}
                  >
                    <img
                      src={typeToTera[type]}
                      alt={type}
                      style={{ width: '25px', marginRight: '5px' }}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <img
              onClick={megaChange}
              width="60px"
              className={`mega-animation ${isMegaAnimating ? 'active' : ''}`}
              src={megaAnimate}
              alt=""
            />
            <img
              onClick={megaChange}
              width="60px"
              className="mega"
              src={megaEvo}
              alt=""
            />
            <img
              onClick={gmaxChange}
              width="60px"
              className="gmax"
              src={gmax}
              alt=""
            />
            <img
              onClick={gmaxChange}
              width="60px"
              className={`gmax-animation ${isGmaxAnimating ? 'active' : ''}`}
              src={gmaxAnimate}
              alt=""
            />
            <img
              onClick={alolaChange}
              className="alola"
              src={alola}
              width="60px"
              alt=""
            />
            <img
              onClick={alolaChange}
              className={`alola-animation ${isAlolaAnimating ? 'active' : ''}`}
              src={alola}
              width="60px"
              alt=""
            />
            <img
              onClick={hisuiChange}
              className={`hisui-animation ${isHisuiAnimating ? 'active' : ''}`}
              src={hisuiAnimate}
              width="60px"
              alt=""
            />
            <img
              onClick={hisuiChange}
              className="hisui"
              src={hisui}
              width="60px"
              alt=""
            />
          </div>
          {data.name.toUpperCase()}
        </Card.Title>
        <Card.Img
          style={{ height: '14rem', objectFit: 'contain' }}
          variant="top"
          src={currentSprite}
        />

        <Card.Body className="cardBody">
          <div className="d-flex">
            <Button
              style={{
                backgroundColor: randomBackgroundColor,
                border:
                  (data.types && data.types.includes('dark')) ||
                  teraType === 'dark'
                    ? '1px solid white'
                    : '1px solid black',
                display: useLocation === '/masterTeams' ? 'none' : 'block',
              }}
              className="mt-4"
              onClick={onRandomClick}
            >
              Random
            </Button>
            <input
              placeholder="Search Pokémon"
              className="input-pokemon"
              type="text"
              onChange={(e) => onSearchPokemon(e.target.value)}
              value={searchValue}
              style={{
                display: useLocation === '/masterTeams' ? 'none' : 'block',
              }}
            />
          </div>
          <Card.Text
            className="text-center"
            style={{
              marginTop: useLocation === '/masterTeams' ? '0.1rem' : '1.5rem',
            }}
          >
            <Stats
              data={data}
              useLocation={useLocation}
              teraType={teraType}
              currentTypes={currentTypes}
            />{' '}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip">{description}</Tooltip>}
            >
              <div
                className="ms-2"
                style={{
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: useLocation === '/masterTeams' ? 'block' : 'none',
                }}
              >
                ℹ️
              </div>
            </OverlayTrigger>
          </Card.Text>
          <MoveSelect data={data} useLocation={useLocation} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default PokemonCard
