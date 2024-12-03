import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNavComponent'
import Pokemon from './components/PokemonInfo'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'

export default function App() {
  const [pokemon, setPokemon] = useState(null)

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemon(parsedData)
    } catch (error) {
      console.error('Errore durante il fetch:', error)
    }
  }

  const parsePokeAPIResponse = (json) => ({
    name: json.name,
    weight: json.weight,
    height: json.height,
    sprite: json.sprites.front_default,
    abilities: json.abilities.map((e) => e.ability.name),
    stats: json.stats.map((e) => ({
      name: e.stat.name,
      value: e.base_stat,
    })),
  })

  useEffect(() => {
    fetchPokemon(25)
  }, [])

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon(randomId)
  }

  return (
    <>
      <header>
        <MyNav />
      </header>
      <main>
        <Container>
          <Row>
            {pokemon && (
              <Pokemon data={pokemon} onRandomClick={handleRandomClick} />
            )}
          </Row>
        </Container>
      </main>
    </>
  )
}
