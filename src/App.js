import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNavComponent'
import PokemonCard from './components/PokemonCard'
import Box from './components/Box'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex'
import Captured from './components/Captured'
import MasterTeams from './components/MasterTeams'

export default function App() {
  const [pokemons, setPokemons] = useState(Array(6).fill(null))
  const [allPokemons, setAllPokemons] = useState([])
  const [searchValues, setSearchValues] = useState(Array(6).fill(''))

  const fetchPokemon = async (id, index) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemons((prev) =>
        prev.map((poke, i) => (i === index ? parsedData : poke))
      )
    } catch (error) {
      console.error('Errore durante il fetch:', error)
    }
  }

  const parsePokeAPIResponse = (json) => ({
    name: json.name,
    weight: json.weight,
    height: json.height,
    spriteStat: json.sprites.other?.showdown?.front_default,
    sprite: json.sprites.other?.['official-artwork']?.front_default,
    spriteShiny: json.sprites.other?.['official-artwork']?.front_shiny,
    abilities: json.abilities.map((e) => e.ability.name),
    moves: json.moves.map((e) => e.move.name),
    stats: json.stats.map((e) => ({
      name: e.stat.name,
      value: e.base_stat,
    })),
    types: json.types.map((e) => e.type.name),
  })

  useEffect(() => {
    const defaultPokemons = [
      'arceus',
      'mewtwo',
      'meowscarada',
      'giratina-origin',
      'darkrai',
      'metagross',
    ]
    defaultPokemons.forEach((id, index) => fetchPokemon(id, index))

    fetchAllPokemons()
  }, [])

  const fetchAllPokemons = async () => {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=1010'
      )
      const data = await response.json()
      setAllPokemons(data.results)
    } catch (error) {
      console.error('Errore durante il fetch di tutti i Pokémon:', error)
    }
  }

  const onRandomClick = (index) => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon(randomId, index)
  }

  const onSearchPokemon = (value, index) => {
    setSearchValues((prev) => prev.map((val, i) => (i === index ? value : val)))
    if (value.trim() !== '') {
      fetchPokemon(value.toLowerCase(), index)
    }
  }

  return (
    <Router>
      <>
        <header>
          <MyNav />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Container>
                    <Row>
                      {pokemons.map((pokemon, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                          {pokemon && (
                            <PokemonCard
                              data={pokemon}
                              onRandomClick={() => onRandomClick(index)}
                              onSearchPokemon={(value) =>
                                onSearchPokemon(value, index)
                              }
                              searchValue={searchValues[index]}
                            />
                          )}
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </>
              }
            />
            <Route path="/box" element={<Box data={allPokemons} />} />{' '}
            <Route path="/pokedex" element={<Pokedex />} />{' '}
            <Route path="/captured" element={<Captured data={allPokemons} />} />{' '}
            <Route
              path="/masterTeams"
              element={<MasterTeams data={allPokemons} />}
            />
          </Routes>
        </main>
      </>
    </Router>
  )
}
