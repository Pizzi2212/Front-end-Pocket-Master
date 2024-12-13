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
import BoxStats from './BoxStats'
import caught from '../caught.png'
import { useDispatch } from 'react-redux'
import { addToCaptured } from '../redux/captured'

function Box({ data }) {
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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

  const fetchWithCache = (() => {
    const cache = new Map()

    return async (url) => {
      if (cache.has(url)) {
        return cache.get(url)
      }
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Errore nel fetch')
        const data = await response.json()
        cache.set(url, data)
        return data
      } catch (error) {
        console.error(`Errore nel fetch per ${url}:`, error.message)
        return null
      }
    }
  })()

  const fetchDetailsInBatches = async (data, batchSize) => {
    const results = []
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      const batchResults = await Promise.all(
        batch.map(async (pokemon) => {
          return await fetchWithCache(pokemon.url)
        })
      )
      results.push(...batchResults)
    }
    return results.filter((pokemon) => pokemon !== null)
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchDetailsInBatches(data, 50)
        setDetailedPokemons(details)
      } catch (error) {
        console.error('Errore durante il fetch:', error.message)
      } finally {
        setLoading(false)
      }
    }

    if (data.length > 0) {
      fetchDetails()
    }
  }, [data])

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="ball"></div>
      </div>
    )
  }

  const filteredPokemons = detailedPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCapture = (pokemon) => {
    dispatch(addToCaptured(pokemon))
  }

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
          if (!pokemon) {
            return (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Text>
                      Dettagli non disponibili per questo Pokémon
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
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
                  <div className="position-relative">
                    <img
                      width="70px"
                      className="caught"
                      src={caught}
                      alt=""
                      onClick={() => handleCapture(pokemon)}
                    />
                  </div>
                  {pokemon.name.toUpperCase()}
                </Card.Title>
                <Card.Img
                  variant="top"
                  style={{ height: '14rem', objectFit: 'contain' }}
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                />
                <Card.Body>
                  <BoxStats data={pokemon} />
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Box
