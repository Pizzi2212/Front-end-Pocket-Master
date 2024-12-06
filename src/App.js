import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNavComponent'
import Pokemon1 from './components/PokemonInfo1'
import Pokemon2 from './components/PokemonInfo2'
import Pokemon3 from './components/Pokemoninfo3'
import Pokemon4 from './components/PokemonInfo4'
import Pokemon5 from './components/PokemonInfo5'
import Pokemon6 from './components/PokemonInfo6'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'

export default function App() {
  const [pokemon, setPokemon] = useState(null)
  const [pokemon2, setPokemon2] = useState(null)
  const [pokemon3, setPokemon3] = useState(null)
  const [pokemon4, setPokemon4] = useState(null)
  const [pokemon5, setPokemon5] = useState(null)
  const [pokemon6, setPokemon6] = useState(null)

  const [searchValue, setSearchValue] = useState('')
  const [searchValue2, setSearchValue2] = useState('')
  const [searchValue3, setSearchValue3] = useState('')
  const [searchValue4, setSearchValue4] = useState('')
  const [searchValue5, setSearchValue5] = useState('')
  const [searchValue6, setSearchValue6] = useState('')

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

  const fetchPokemon2 = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemon2(parsedData)
    } catch (error) {
      console.error('Errore durante il fetch:', error)
    }
  }

  const fetchPokemon3 = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemon3(parsedData)
    } catch (error) {
      console.error('Errore durante il fetch:', error)
    }
  }

  const fetchPokemon4 = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemon4(parsedData)
    } catch (error) {
      console.error('Errore durante il fetch:', error)
    }
  }

  const fetchPokemon5 = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemon5(parsedData)
    } catch (error) {
      console.error('Errore durante il fetch:', error)
    }
  }

  const fetchPokemon6 = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await response.json()
      const parsedData = parsePokeAPIResponse(json)
      setPokemon6(parsedData)
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
    fetchPokemon('arceus')
    fetchPokemon2('mewtwo')
    fetchPokemon3('zacian-crowned')
    fetchPokemon4('giratina-origin')
    fetchPokemon5('darkrai')
    fetchPokemon6('metagross')
  }, [])

  const onRandomClick = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon(randomId)
  }

  const onSearchPokèmon = (value) => {
    setSearchValue(value)
    if (value.trim() !== '') {
      fetchPokemon(value.toLowerCase())
    }
  }

  const onRandomClick2 = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon2(randomId)
  }

  const onSearchPokèmon2 = (value) => {
    setSearchValue2(value)
    if (value.trim() !== '') {
      fetchPokemon2(value.toLowerCase())
    }
  }

  const onRandomClick3 = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon3(randomId)
  }

  const onSearchPokèmon3 = (value) => {
    setSearchValue3(value)
    if (value.trim() !== '') {
      fetchPokemon3(value.toLowerCase())
    }
  }

  const onRandomClick4 = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon4(randomId)
  }

  const onSearchPokèmon4 = (value) => {
    setSearchValue4(value)
    if (value.trim() !== '') {
      fetchPokemon4(value.toLowerCase())
    }
  }

  const onRandomClick5 = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon5(randomId)
  }

  const onSearchPokèmon5 = (value) => {
    setSearchValue5(value)
    if (value.trim() !== '') {
      fetchPokemon5(value.toLowerCase())
    }
  }

  const onRandomClick6 = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1
    fetchPokemon6(randomId)
  }

  const onSearchPokèmon6 = (value) => {
    setSearchValue6(value)
    if (value.trim() !== '') {
      fetchPokemon6(value.toLowerCase())
    }
  }

  return (
    <>
      <header>
        <MyNav />
      </header>
      <main>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={4}>
              {pokemon && (
                <Pokemon1
                  data={pokemon}
                  onRandomClick={onRandomClick}
                  onSearchPokèmon={onSearchPokèmon}
                  searchValue={searchValue}
                />
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              {pokemon2 && (
                <Pokemon2
                  data={pokemon2}
                  onRandomClick2={onRandomClick2}
                  onSearchPokèmon2={onSearchPokèmon2}
                  searchValue2={searchValue2}
                />
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              {pokemon3 && (
                <Pokemon3
                  data={pokemon3}
                  onRandomClick3={onRandomClick3}
                  onSearchPokèmon3={onSearchPokèmon3}
                  searchValue3={searchValue3}
                />
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              {pokemon4 && (
                <Pokemon4
                  data={pokemon4}
                  onRandomClick4={onRandomClick4}
                  onSearchPokèmon4={onSearchPokèmon4}
                  searchValue4={searchValue4}
                />
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              {pokemon5 && (
                <Pokemon5
                  data={pokemon5}
                  onRandomClick5={onRandomClick5}
                  onSearchPokèmon5={onSearchPokèmon5}
                  searchValue5={searchValue5}
                />
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              {pokemon6 && (
                <Pokemon6
                  data={pokemon6}
                  onRandomClick6={onRandomClick6}
                  onSearchPokèmon6={onSearchPokèmon6}
                  searchValue6={searchValue6}
                />
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}
