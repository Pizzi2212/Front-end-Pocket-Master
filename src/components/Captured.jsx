import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
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
import leave from '../leave.png'
import { removeFromCaptured } from '../redux/captured'
import Alert from 'react-bootstrap/Alert'
import Ngif from '../Ngif.gif'

const Captured = () => {
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

  const capturedPokemons = useSelector(
    (state) => state.captured.capturedPokemons
  )

  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false)
  const [removePokemonName, setRemovePokemonName] = useState('')
  const [removePokemonSprite, setRemovePokemonSprite] = useState(null)

  const removeCaptured = (pokemon) => {
    dispatch(removeFromCaptured(pokemon.id))
    setRemovePokemonName(pokemon.name)
    setRemovePokemonSprite(pokemon.sprites.other?.showdown?.front_default)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  // const handleExport = () => {
  //   const dataStr = JSON.stringify(capturedPokemons, null, 2)
  //   const blob = new Blob([dataStr], { type: 'application/json' })
  //   const url = URL.createObjectURL(blob)

  //   const link = document.createElement('a')
  //   link.href = url
  //   link.download = 'capturedPokemons.json'
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }

  return (
    <div>
      <Container>
        {showAlert && (
          <Alert
            variant="success"
            className="custom-alert"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>
              <div className="d-flex flex-column">
                <div>
                  <img src={removePokemonSprite} alt="Removed Pokemon" />{' '}
                  {removePokemonName.toUpperCase()} is now free
                </div>
                <div className="d-flex flex-column align-items-center ">
                  <img style={{ width: '120px' }} src={Ngif} alt="N" />
                  <div className="bg-light border border-2 border-dark rounded-3 p-2">
                    <p>Im so proud of you..</p>
                  </div>
                </div>
              </div>
            </Alert.Heading>
          </Alert>
        )}
        <Row>
          {capturedPokemons.map((pokemon, index) => {
            const backgroundImage =
              typeToBackground[pokemon.types[0]?.type.name] || normalCard

            return (
              <Col key={index} xs={12} md={6} lg={4}>
                <Card
                  style={{
                    width: '25rem',
                    height: '35rem',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                  }}
                  className="m-3"
                >
                  <Card.Title
                    className="text-center mt-4"
                    style={{
                      color:
                        pokemon.types &&
                        pokemon.types.some((type) => type.type.name === 'dark')
                          ? 'white'
                          : 'black',
                    }}
                  >
                    <div
                      onClick={() => {
                        removeCaptured(pokemon)
                      }}
                      className="position-relative"
                    >
                      <img width="90px" className="leave" src={leave} alt="" />
                    </div>
                    {pokemon.name.toUpperCase()}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    style={{ height: '14rem', objectFit: 'contain' }}
                    src={
                      pokemon.sprites.other['official-artwork'].front_default
                    }
                    alt={pokemon.name}
                  />
                  <Card.Body></Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Captured
