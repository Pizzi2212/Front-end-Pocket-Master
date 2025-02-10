import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import pokedex from '../pokedexReal2.jpeg'
import { Card, Button } from 'react-bootstrap'
import { GoStarFill } from 'react-icons/go'
import Details from './DetailsPokedex'

function Pokedex() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { pokemon } = state
  const [currentSprite, setCurrentSprite] = useState(
    pokemon.sprites.other?.['official-artwork']?.front_default
  )
  const shiny = () => {
    setCurrentSprite((prevSprite) =>
      prevSprite === pokemon.sprites.other?.['official-artwork']?.front_default
        ? pokemon.sprites.other?.['official-artwork']?.front_shiny
        : pokemon.sprites.other?.['official-artwork']?.front_default
    )
  }

  useEffect(() => {
    setCurrentSprite(pokemon.sprites.other?.['official-artwork']?.front_default)
  }, [pokemon])
  if (!state || !state.pokemon) {
    return (
      <div>
        <h1>No Pokémon selected!</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  // const nextPokemon = () => {
  //   navigate('/pokedex', { state: { id: pokemon.id + 1 } })
  // }

  return (
    <div className=" d-flex justify-content-center mt-3">
      <Card
        style={{
          width: '30rem',
          height: '50rem',
          backgroundImage: `url(${pokedex})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '10px solid black',
        }}
      >
        <Card.Body>
          <Card.Title className="title-pokedex text-center mt-2">
            {pokemon.name.toUpperCase() + ' ' + '#' + pokemon.id}
            <GoStarFill className="text-primary star-pokedex" onClick={shiny} />
          </Card.Title>

          <div className="sprite-pokedex d-flex justify-content-center">
            <Card.Img
              src={currentSprite}
              style={{ width: '200px' }}
              className="mb-2"
            />
          </div>

          <Card.Text>
            <div className="mt-5 ms-2">
              <p>
                <strong>Type</strong>:{' '}
                {pokemon.types
                  .map((typeObj) => typeObj.type.name.toUpperCase())
                  .join(', ')}
              </p>
              <p>
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>

              <p style={{ fontSize: '0.8em' }}>
                <strong style={{ fontSize: '1.2em' }}>Description:</strong>{' '}
                {
                  pokemon.species.flavor_text_entries.find(
                    (entry) => entry.language.name === 'en'
                  ).flavor_text
                }
              </p>
            </div>
          </Card.Text>
          <Button
            className="goBack p-4"
            style={{ opacity: '0' }}
            onClick={() => navigate(-1)}
          ></Button>
          {/* <Button onClick={nextPokemon}></Button> */}
          <Details pokemon={pokemon} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Pokedex
