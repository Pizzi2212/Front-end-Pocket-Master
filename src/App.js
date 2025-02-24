import React, { useEffect, useState } from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNavComponent'
import PokemonCard from './components/PokemonCard'
import Box from './components/Box'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import Pokedex from './components/Pokedex'
import Captured from './components/Captured'
import MasterTeams from './components/MasterTeams'
import WelcomePage from './components/WelcomePage'
import { AnimatePresence, motion } from 'framer-motion'
import Settings from './components/Settings'

export default function App() {
  const [pokemons, setPokemons] = useState(Array(6).fill(null))
  const [allPokemons, setAllPokemons] = useState([])
  const [searchValues, setSearchValues] = useState(Array(6).fill(''))

  const location = useLocation()
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
      'mew',
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
    <>
      <header>
        <MyNav />
      </header>
      <main>
        <AnimatePresence mode="wait">
          {' '}
          <Routes location={location} key={location.pathname}>
            <Route
              path="/home"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
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
                </motion.div>
              }
            />
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <WelcomePage />
                </motion.div>
              }
            />
            <Route
              path="/box"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Box data={allPokemons} />
                </motion.div>
              }
            />
            <Route
              path="/pokedex"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Pokedex />
                </motion.div>
              }
            />
            <Route
              path="/captured"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Captured data={allPokemons} />
                </motion.div>
              }
            />
            <Route
              path="/masterTeams"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <MasterTeams data={allPokemons} />
                </motion.div>
              }
            />
            <Route
              path="/settings"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Settings />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}
