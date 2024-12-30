import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import pokedex from '../pokedexReal2.jpeg'
import { Card, Button } from 'react-bootstrap'

function Pokedex() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state || !state.pokemon) {
    return (
      <div>
        <h1>No Pokémon selected!</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  const { pokemon } = state

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
            {pokemon.name.toUpperCase()}
          </Card.Title>
          <div className="sprite-pokedex d-flex justify-content-center">
            <Card.Img
              src={pokemon.sprites.other?.['official-artwork']?.front_default}
              style={{ width: '200px' }}
            />
          </div>

          <Card.Text>
            <div className="mt-5 ms-2">
              <p>
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
              <p>
                <strong> Abilities</strong>:{' '}
                {pokemon.abilities.map((a) => a.ability.name).join(', ')}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {
                  pokemon.species.flavor_text_entries.find(
                    (entry) => entry.language.name === 'en'
                  ).flavor_text
                }
              </p>
            </div>
          </Card.Text>
          {/* <Button onClick={() => navigate(-1)}>Go Back</Button> */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Pokedex
