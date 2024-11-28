import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import PokemonInfo from './PokemonInfo' // Importa il componente PokemonInfo

function App() {
  const [pokemonName, setPokemonName] = useState('pikachu')

  return (
    <Container className="mt-5">
      <h1>Pokédex</h1>
      <Form.Control
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value.toLowerCase())} // Cambia il nome del Pokémon
        placeholder="Inserisci il nome di un Pokémon"
        className="mb-3"
      />
      <Button variant="primary">Cerca Pokémon</Button>
      <PokemonInfo pokemonName={pokemonName} />
    </Container>
  )
}

export default App
