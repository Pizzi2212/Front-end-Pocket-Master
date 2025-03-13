import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import PokemonCard from './PokemonCard'
import { useLocation } from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import CustomTooltip from './CustomTooltip'

const MasterTeams = () => {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState()
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  const currentTeam = teams.find((team) => team.id === parseInt(selectedTeam))

  const fetchTeams = async () => {
    try {
      const bearer =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczOTg5MDI5MywiZXhwIjoxNzM5OTc2NjkzfQ.Citpq4uqNjuNbtQBgLcQh-CbSzttjHOlLrVdvsrQO-k'
      const response = await fetch('http://localhost:8080/teams', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      })

      if (response.status === 401) {
        throw new Error('Not authorized. Make sure you are logged in.')
      }

      const data = await response.json()

      const sortedData = data.sort((a, b) => a.id - b.id)
      setTeams(sortedData)

      const firstTeam = sortedData.find((team) => team.id === 1)
      if (firstTeam) {
        setSelectedTeam(firstTeam.id)
      } else if (sortedData.length > 0) {
        setSelectedTeam(sortedData[0].id)
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
    }
  }

  const fetchPokemonForTeam = async (teamId) => {
    if (!teamId) return
    setIsLoading(true)
    try {
      const bearer =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczOTg5MDI5MywiZXhwIjoxNzM5OTc2NjkzfQ.Citpq4uqNjuNbtQBgLcQh-CbSzttjHOlLrVdvsrQO-k'

      const response = await fetch(`http://localhost:8080/teams/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      })

      if (response.status === 401) {
        throw new Error('Not authorized. Make sure you are logged in.')
      }

      const data = await response.json()
      console.log('Dati del team ricevuti:', data)
      const pokemonDescriptions = data.pokemonDescriptions || {}

      const parsedPokemons = data.pokemons.map((pokemon) => {
        const parsedData = parsePokeAPIResponse(pokemon)
        return {
          ...parsedData,
          description:
            pokemonDescriptions[pokemon.name] || 'No description available',
        }
      })

      setPokemonList(parsedPokemons)
    } catch (error) {
      console.error('Error fetching team:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    if (selectedTeam) {
      fetchPokemonForTeam(selectedTeam)
    }
  }, [selectedTeam])

  const parsePokeAPIResponse = (json) => ({
    name: json.name,
    weight: json.weight,
    height: json.height,
    spriteStat: json.sprites?.other?.showdown?.front_default || '',
    sprite: json.sprites?.other?.['official-artwork']?.front_default || '',
    spriteShiny: json.sprites?.other?.['official-artwork']?.front_shiny || '',
    abilities: json.abilities ? json.abilities.map((e) => e.ability.name) : [],
    moves: json.moves ? json.moves.map((e) => e.move.name) : [],
    stats: json.stats
      ? json.stats.map((e) => ({
          name: e.stat.name,
          value: e.base_stat,
        }))
      : [],
    types: json.types ? json.types.map((e) => e.type.name) : ['unknown'],
  })

  const handleOptionChange = (e) => {
    setSelectedTeam(e.target.value)
  }

  const sortedTeams = [...teams].sort((a, b) => a.id - b.id)

  return (
    <Container>
      <div className="d-flex align-items-center">
        <CustomTooltip
          content={
            <div className="directionTooltip">
              <div className="me-4">
                <h4>HC-NZ</h4>
                <div>
                  <p>
                    A Nuzlocke Challenge in Pokémon is a self-imposed set of
                    rules designed to make the games more difficult and
                    emotionally engaging. The two core rules are:
                  </p>
                  <ul>
                    <li>
                      Permadeath – If a Pokémon faints, it's considered "dead"
                      and must be released or permanently stored in the PC.
                    </li>
                    <li>
                      First Encounter Rule – You can only catch the first
                      Pokémon you encounter in each area. If you fail to catch
                      it, you lose your chance for that area.
                    </li>
                  </ul>
                  <p>
                    An Hardcore Nuzlocke takes the challenge even further with
                    additional difficulty rules:
                  </p>
                  <ul>
                    <li>
                      No Overleveling – Your Pokémon cannot exceed the level of
                      the next Gym Leader’s highest-level Pokémon.
                    </li>
                    <li>
                      Set Battle Mode – You must play on “Set” mode, meaning you
                      can’t switch Pokémon after KOing an opponent’s.
                    </li>
                    <li>
                      No Healing Items in Battle – You cannot use Potions, Full
                      Restores, or similar healing items during fights.
                    </li>
                    <li>
                      Limited Items and Other Restrictions – Some runs limit
                      held items, EV training, or even Pokémon Center visits.
                    </li>
                  </ul>
                  <p>
                    These extra rules make Hardcore Nuzlockes one of the most
                    challenging ways to play Pokémon, requiring strategic
                    planning, deep game knowledge, and adaptability to survive.
                  </p>
                </div>
              </div>
              <div>
                <h4>Monotype</h4>
                <p>
                  A Monotype Challenge is a self-imposed Pokémon playthrough
                  where the player can only use Pokémon of a single type
                  throughout the entire game. This adds a layer of difficulty,
                  forcing strategic thinking and creative team-building. Basic
                  Rules:
                </p>
                <ul>
                  <li>
                    Only One Type – All Pokémon on your team must share at least
                    one type (e.g., all Water-type, all Fire-type, etc.).
                  </li>
                  <li>
                    Catching Restrictions – You can only catch Pokémon that
                    match your chosen type.
                  </li>
                  <li>
                    Dual-Type Pokémon Allowed – If a Pokémon has your chosen
                    type as one of its types, it can be used (e.g., Gyarados in
                    a Water monotype run).
                  </li>
                  <li>
                    Starter Choice – If your starter doesn’t match your type,
                    you must replace it as soon as possible.
                  </li>
                  <p>Challenges & Strategies:</p>
                  <ul>
                    <li>
                      Some types struggle against certain Gym Leaders or the
                      Elite Four (e.g., a Flying-type run against Electric-type
                      opponents).
                    </li>
                    <li>
                      You need to carefully use TMs, Abilities, and held items
                      to counter weaknesses.
                    </li>
                    <li>
                      Certain Pokémon types have fewer species available, making
                      team-building harder (e.g., Ice or Dragon).
                    </li>
                    <p>
                      A Hardcore Monotype Challenge can add Nuzlocke rules,
                      level caps, or no in-battle healing, making it even
                      tougher
                    </p>
                  </ul>
                </ul>
              </div>
            </div>
          }
        >
          <div
            className="me-2"
            style={{ cursor: 'pointer', fontSize: '2.5rem' }}
          >
            📖
          </div>
        </CustomTooltip>

        <Form.Select
          value={selectedTeam}
          onChange={handleOptionChange}
          className="mb-3 mt-3"
          style={{
            backgroundColor: '#D0E9FF',
            border: '1px solid #80BFFF',
            color: '#004080',
            borderRadius: '60px',
            cursor: 'pointer',
            outline: 'none',
            color: 'black',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          {sortedTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Form.Select>
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id="tooltip">
              {currentTeam ? currentTeam.description : 'Select a team'}
            </Tooltip>
          }
        >
          <div
            className="ms-2"
            style={{ cursor: 'pointer', fontSize: '2.5rem' }}
          >
            ℹ️
          </div>
        </OverlayTrigger>
      </div>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <div className="ball"></div>
        </div>
      ) : (
        <Row>
          {pokemonList.map((pokemon, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <PokemonCard
                description={pokemon.description}
                data={pokemon}
                useLocation={location.pathname}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default MasterTeams
