import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import PokemonCard from './PokemonCard'

const MasterTeams = ({ data }) => {
  const [teams, setTeams] = useState({
    'HC-NZ RU/SA/EM': [],
    'HC-NZ DI/PE/PL': [],
    'HC-NZ FIRE/LEAF': [],
    'HC-NZ HG/SS': [],
    'HC-NZ HG/SS KANTO': [],
    'HC-NZ BW': [],
    'HC-NZ BW2': [],
    'HC-NZ X/Y': [],
    'HC-NZ OR/AS': [],
    'HC-NZ SUN/MOON': [],
    'HC-NZ SWO/SH': [],
  })
  const [selectedOption, setSelectedOption] = useState('HC-NZ RU/SA/EM')
  const [isLoading, setIsLoading] = useState(false)

  const teamConfigurations = {
    'HC-NZ RU/SA/EM': [
      'swampert',
      'breloom',
      'vigoroth',
      'hariyama',
      'manectric',
      'armaldo',
    ],
    'HC-NZ FIRE/LEAF': [
      'blastoise',
      'snorlax',
      'jolteon',
      'nidoking',
      'exeggutor',
      'arcanine',
    ],

    'HC-NZ DI/PE/PL': [
      'empoleon',
      'luxray',
      'gengar',
      'bronzong',
      'honchkrow',
      'machamp',
    ],
    'HC-NZ HG/SS': [
      'feraligatr',
      'heracross',
      'steelix',
      'espeon',
      'miltank',
      'ampharos',
    ],
    'HC-NZ HG/SS KANTO': [
      'venusaur',
      'heracross',
      'steelix',
      'espeon',
      'vaporeon',
      'ampharos',
    ],
    'HC-NZ BW': [
      'serperior',
      'stoutland',
      'scolipede',
      'seismitoad',
      'mandibuzz',
      'chandelure',
    ],
    'HC-NZ BW2': [
      'samurott',
      'volcarona',
      'lucario',
      'gothitelle',
      'zoroark',
      'amoonguss',
    ],
    'HC-NZ X/Y': [
      'greninja',
      'charizard',
      'gogoat',
      'lucario',
      'sylveon',
      'ampharos',
    ],
    'HC-NZ OR/AS': [
      'swampert',
      'gardevoir',
      'flygon',
      'sableye',
      'crobat',
      'camerupt',
    ],
    'HC-NZ SUN/MOON': [
      'decidueye',
      'salamence',
      'espeon',
      'golisopod',
      'toucannon',
      'mudsdale',
    ],
    'HC-NZ SWO/SH': [
      'rillaboom',
      'grimmsnarl',
      'corviknight',
      'dragapult',
      'toxtricity-amped',
      'lapras',
    ],
  }

  const fetchPokemonForTeam = async (teamName) => {
    setIsLoading(true)
    const pokemonNames = teamConfigurations[teamName] || []
    const promises = pokemonNames.map(async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const json = await response.json()
      return parsePokeAPIResponse(json)
    })

    try {
      const fetchedPokemons = await Promise.all(promises)
      setTeams((prev) => ({ ...prev, [teamName]: fetchedPokemons }))
    } catch (error) {
      console.error('Errore durante il fetch dei Pokémon:', error)
    } finally {
      setIsLoading(false)
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
    fetchPokemonForTeam(selectedOption)
  }, [selectedOption])

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  return (
    <Container>
      <Form.Select
        value={selectedOption}
        onChange={handleOptionChange}
        className="mb-3"
      >
        {Object.keys(teamConfigurations).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <div className="ball"></div>
        </div>
      ) : (
        <Row>
          {teams[selectedOption].map((pokemon, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <PokemonCard data={pokemon} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default MasterTeams
