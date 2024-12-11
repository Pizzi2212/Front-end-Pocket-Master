import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
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

function Box({ data }) {
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

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

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        data.map(async (pokemon) => {
          const response = await fetch(pokemon.url)
          return await response.json()
        })
      )
      setDetailedPokemons(details)
    }

    if (data.length > 0) {
      fetchDetails()
    }
  }, [data])

  // Funzione per filtrare i Pokémon in base al nome
  const filteredPokemons = detailedPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Container>
      <input
        placeholder="Search Pokémon"
        className="input-pokemon"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Row>
        {filteredPokemons.map((pokemon, index) => {
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
                    color: pokemon.types.includes('dark') ? 'white' : 'black',
                  }}
                >
                  #{pokemon.id} {pokemon.name.toUpperCase()}
                </Card.Title>
                <Card.Img
                  variant="top"
                  style={{ height: '14rem', objectFit: 'contain' }}
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                />
                <Card.Body></Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Box
