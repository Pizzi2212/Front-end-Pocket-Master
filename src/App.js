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
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/authSlice'
import { setUser as setCapturedUser } from './redux/capturedSlice'
import MasterChat from './components/MasterChat'
import Community from './components/Community'
import QnA from './components/QnA'

export default function App() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.userId)

  const [pokemons, setPokemons] = useState(Array(6).fill(null))
  const [allPokemons, setAllPokemons] = useState([])
  const [searchValues, setSearchValues] = useState(Array(6).fill(''))
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    let userId = null

    if (token) {
      try {
        const tokenParts = token.split('.')
        if (tokenParts.length === 3) {
          const decodedPayload = JSON.parse(atob(tokenParts[1]))
          userId = decodedPayload.id
        }
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }

    if (userId) {
      const savedAvatar = localStorage.getItem(`avatar_${userId}`)
      if (savedAvatar) {
        setAvatar(savedAvatar)
      }
    }
  }, [])
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found.')
      return null
    }

    try {
      console.log('✅ Token recuperato:', token)

      const tokenParts = token.split('.')
      if (tokenParts.length !== 3) {
        console.error('Token not valid.')
        return null
      }

      const base64Url = tokenParts[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const decodedPayload = JSON.parse(atob(base64))

      console.log('✅ Payload JWT :', decodedPayload)

      if (!decodedPayload.id) {
        console.error('User ID not found in token.')
        return null
      }

      console.log('✅ User ID extract from token:', decodedPayload.id)
      return decodedPayload.id
    } catch (error) {
      console.error(' Error decoding token:', error)
      return null
    }
  }

  const fetchUserData = async () => {
    const userId = getUserIdFromToken()
    if (!userId) return

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Error fetching user data')
      }

      const userData = await response.json()
      setUsername(userData.username)

      dispatch(setUser(userData.id))
      dispatch(setCapturedUser(userData.id))
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const location = useLocation()
  const fetchPokemon = async (id, index) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      let parsedData = parsePokeAPIResponse(json)

      const formResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-form/${id}`
      )
      if (formResponse.ok) {
        const formJson = await formResponse.json()
        parsedData = {
          ...parsedData,
          formName: formJson.form_name || null,
          isDefault: formJson.is_default,
          formSprites: formJson.sprites.front_default,
        }
      }

      setPokemons((prev) =>
        prev.map((poke, i) => (i === index ? parsedData : poke))
      )
    } catch (error) {
      console.error('Error fetching Pokémon or Form:', error)
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
      'ninetales',
      'charizard',
      'zoroark',
      'giratina-altered',
      'eternatus',
      'lucario',
    ]
    defaultPokemons.forEach((id, index) => fetchPokemon(id, index))

    fetchAllPokemons()
    if (localStorage.getItem('token')) {
      fetchUserData()
    }
  }, [])

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users`)
      const userData = await response.json()
      setAllUsers(userData)
      console.log(userData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])
  const fetchAllPokemons = async () => {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=1010'
      )
      const data = await response.json()
      setAllPokemons(data.results)
    } catch (error) {
      console.error('Error fetching all Pokémon:', error)
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
        <MyNav username={username} userAvatar={avatar} />
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
                  <WelcomePage setUsername={setUsername} />
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
                  <MasterTeams userId={userId} data={allPokemons} />
                </motion.div>
              }
            />
            <Route
              path="/masterChat"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <MasterChat />
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
                  <Settings setUsername={setUsername} setAvatar={setAvatar} />
                </motion.div>
              }
            />
            <Route
              path="/QnA"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <QnA />
                </motion.div>
              }
            />
            <Route
              path="/community"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Community allUsers={allUsers} />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}
