import React, { useState, useEffect } from 'react'

const PokemonInfo = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Funzione per ottenere i dati del Pokémon usando fetch
    const fetchPokemonData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        )
        if (!response.ok) {
          throw new Error('Pokémon non trovato!')
        }
        const data = await response.json()
        setPokemon(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [pokemonName]) // Ricarica ogni volta che cambia pokemonName

  if (loading) {
    return <div>Caricamento...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <strong>Altezza:</strong> {pokemon.height}
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.weight}
      </p>
      <h3>Tipi:</h3>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonInfo
