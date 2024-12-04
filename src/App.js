import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNavComponent'
import Pokemon1 from './components/PokemonInfo1'
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
    spriteStat: json.sprites.other?.home?.front_default,
    sprite: json.sprites.other?.['official-artwork']?.front_default,
    spriteShiny: json.sprites.front_shiny,
    abilities: json.abilities.map((e) => e.ability.name),
    stats: json.stats.map((e) => ({
      name: e.stat.name,
      value: e.base_stat,
    })),
    types: json.types.map((e) => e.type.name),
  })

  useEffect(() => {
    fetchPokemon('1010')
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
              <Pokemon1 data={pokemon} onRandomClick={handleRandomClick} />
            )}
          </Row>
        </Container>
      </main>
    </>
  )
}
