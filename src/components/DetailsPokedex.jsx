import React, { useState, useEffect } from 'react'
import { Modal, Button, Table, Form, Row, Col, Badge } from 'react-bootstrap'
import { SiUnacademy } from 'react-icons/si'

function Details({ pokemon }) {
  const [show, setShow] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [moves, setMoves] = useState([])
  const [games, setGames] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (pokemon.moves) {
      setMoves(pokemon.moves)
    }
    fetchGamesData(pokemon.id)
  }, [pokemon])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const fetchGamesData = async (pokemonId) => {
    const gameColors = {
      red: '#FF0000',
      blue: '#0000FF',
      yellow: '#FFFF00',
      gold: '#A3925A',
      silver: '#85C1E6',
      crystal: '#8D9FD6',
      ruby: '#E0115F',
      sapphire: '#0F52BA',
      emerald: '#50C878',
      firered: '#DD8155',
      leafgreen: '#7CC446',
      diamond: '#A8C2D9',
      pearl: '#E7C4D8',
      platinum: '#9399AE',
      heartgold: '#E0B73D',
      soulsilver: '#D2DADD',
      black: '#000000',
      white: '#FFFFFF',
      'black-2': '#000000',
      'white-2': '#FFFFFF',
      x: '#A5DCA3',
      y: '#343A4C',
      'omega-ruby': '#E87C01',
      'alpha-sapphire': '#5CD9ED',
      sun: '#BE4018',
      moon: '#283C85',
      'ultra-sun': '#EF2613',
      'ultra-moon': '#8E6BAC',
      'lets-go-pikachu': '#E6AA2A',
      'lets-go-eevee': '#B75A3D',
      sword: '#5A8BCC',
      shield: '#D43790',
      legends: '#946F3E',
      scarlet: '#B52139',
      violet: '#A22896',
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      )
      const data = await response.json()

      if (data && data.flavor_text_entries) {
        const gameVersions = data.flavor_text_entries.map((entry) => ({
          name: entry.version.name,
          color: gameColors[entry.version.name] || 'lightgray', // Default color
        }))
        const uniqueGames = [
          ...new Map(gameVersions.map((item) => [item.name, item])).values(),
        ]
        setGames(uniqueGames)
        console.log(gameVersions)
      } else {
        const pokemonName = pokemon.name.toLowerCase()
        setGames([{ name: pokemonName, color: 'lightgray' }])
      }
    } catch (error) {
      console.error('Error fetching games data:', error)
    }
  }

  const filteredMoves = moves.filter((move) =>
    move.move.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedMoves = filteredMoves.sort((a, b) => {
    const levelA = a.version_group_details[0]?.level_learned_at || Infinity
    const levelB = b.version_group_details[0]?.level_learned_at || Infinity
    return levelA - levelB
  })

  return (
    <>
      <Button
        style={{ backgroundColor: '#8DC73F', border: '1px solid #8DC73F' }}
        className="moreDetails"
        onClick={handleShow}
      >
        More details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <img
                src={pokemon.sprites.other?.['official-artwork']?.front_default}
                style={{ width: '200px' }}
                alt={`${pokemon.name} sprite`}
              />
              {pokemon.name.toUpperCase()}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Sezione dei giochi */}
          <h5>Available in Games:</h5>
          <Row>
            {games.length === 0 ? (
              <Col className="text-center">
                <p>No games found</p>
              </Col>
            ) : (
              games.map((game, index) => (
                <Button
                  key={index}
                  style={{
                    backgroundColor: game.color,
                    color: game.color === '#000000' ? 'white' : 'black',
                    border: `1px solid ${
                      game.color === '#FFFFFF' ? '#000' : game.color
                    }`,
                    cursor: 'default',
                  }}
                  className="mr-2 mb-2 p-2"
                >
                  {game.name.toUpperCase()}
                </Button>
              ))
            )}
          </Row>
          <hr />

          <h5>Base Stats</h5>
          {pokemon.stats && pokemon.stats.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.stat?.name || 'Unknown'}</td>
                    <td>{stat.base_stat || 0}</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>
                      {pokemon.stats.reduce(
                        (sum, stat) => sum + (stat.base_stat || 0),
                        0
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>No stats available</p>
          )}
          <hr />

          {/* Campo di ricerca per le mosse */}
          <h5 className="mt-4">Moves</h5>
          <Form.Control
            type="text"
            placeholder="Search moves"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Move</th>
                <th>Level Learned</th>
              </tr>
            </thead>
            <tbody>
              {sortedMoves.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center">
                    No moves found
                  </td>
                </tr>
              ) : (
                sortedMoves.map((move) => (
                  <tr key={move.move.name}>
                    <td>{move.move.name}</td>
                    <td>
                      {move.version_group_details[0]?.level_learned_at ||
                        'Using Mt/NPC'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Details
