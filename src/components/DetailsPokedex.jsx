import React, { useState, useEffect } from 'react'
import { Modal, Button, Table, Form, Row, Col, Badge } from 'react-bootstrap'

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
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      )
      const data = await response.json()

      if (data && data.flavor_text_entries) {
        const gameVersions = data.flavor_text_entries.map(
          (entry) => entry.version.name
        )
        setGames([...new Set(gameVersions)])
      } else {
        const pokemonName = pokemon.name.toLowerCase()
        setGames([pokemonName] || [])
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
      <Button variant="primary" onClick={handleShow}>
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
          <h5>Available in Games</h5>
          <Row>
            {games.length === 0 ? (
              <Col className="text-center">
                <p>No games found</p>
              </Col>
            ) : (
              games.map((game, index) => (
                <Badge key={index} variant="info" className="mr-2 mb-2">
                  {game.toUpperCase()}
                </Badge>
              ))
            )}
          </Row>

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
