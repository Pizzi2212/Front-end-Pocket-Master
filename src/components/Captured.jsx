import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Row, Col, Container } from 'react-bootstrap'
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

const Captured = ({ data }) => {
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

  return (
    <div>
      <Container>
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
                  <Card.Title className="text-center mt-4">
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
