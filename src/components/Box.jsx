import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import normalCard from '../card-normal.png'
import bugCard from '../card-bug.png'
import darkCard from '../card-dark.png'
import dragonCard from '../card-dragon.png'
import electricCard from '../card-electric.png'
import fairyCard from '../card-fairy.png'
import fightCard from '../card-fight.png'
import ghostCard from '../card-ghost.png'
import grassCard from '../card-grass.png'
import iceCard from '../card-ice.png'
import poisonCard from '../card-poison.png'
import psychicCard from '../card-psychic.jpg'
import rockCard from '../card-rock.png'
import steelCard from '../card-steel.png'
import waterCard from '../card-water.png'
import fireCard from '../card-fire.png'
import groundCard from '../card-ground.png'
import flyCard from '../card-fly.png'
import iconPokedex from '../iconPokedex.png'
import caught from '../caught.png'
import { useDispatch, useSelector } from 'react-redux'
import { addToCaptured, removeFromCaptured } from '../redux/captured'
import Ncatch from '../Ncatch.png'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Box({ data }) {
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [generation, setGeneration] = useState('1')
  const [type, setType] = useState('all')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const capturedPokemons = useSelector(
    (state) => state.captured.capturedPokemons
  )
  const capturedPokemonIds = new Set(
    capturedPokemons.map((pokemon) => pokemon.id)
  )

  const typeToBackground = {
    steel: steelCard,
    psychic: psychicCard,
    ghost: ghostCard,
    fire: fireCard,
    ice: iceCard,
    water: waterCard,
    electric: electricCard,
    fighting: fightCard,
    ground: groundCard,
    poison: poisonCard,
    grass: grassCard,
    rock: rockCard,
    bug: bugCard,
    dark: darkCard,
    fairy: fairyCard,
    normal: normalCard,
    dragon: dragonCard,
    flying: flyCard,
  }

  const fetchWithCache = (() => {
    const cache = new Map()

    return async (url) => {
      if (cache.has(url)) {
        return cache.get(url)
      }
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Errore nel fetch')
        const data = await response.json()
        cache.set(url, data)
        return data
      } catch (error) {
        console.error(`Errore nel fetch per ${url}:`, error.message)
        return null
      }
    }
  })()

  const fetchDetailsInBatches = async (data, batchSize) => {
    const results = []
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      const batchResults = await Promise.all(
        batch.map(async (pokemon) => {
          try {
            const details = await fetchWithCache(pokemon.url)

            const species = await fetchWithCache(details.species.url)

            return { ...details, species }
          } catch (error) {
            console.error(
              `Errore nel fetch dei dettagli per ${pokemon.name}:`,
              error.message
            )
            return null
          }
        })
      )
      results.push(...batchResults)
    }
    return results.filter((pokemon) => pokemon !== null)
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchDetailsInBatches(data, 50)
        setDetailedPokemons(details)
      } catch (error) {
        console.error('Errore durante il fetch:', error.message)
      } finally {
        setLoading(false)
      }
    }

    if (data.length > 0) {
      fetchDetails()
    }
  }, [data])

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="ball"></div>
      </div>
    )
  }

  const filteredPokemons = detailedPokemons
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((pokemon) => {
      if (generation === '1') return true
      return pokemon.species.generation.name === generation
    })
    .filter((pokemon) => {
      if (type === 'all') return true
      return pokemon.types.some((t) => t.type.name === type)
    })

  const handleCapture = (pokemon) => {
    dispatch(addToCaptured(pokemon))
  }

  const pokedex = (pokemon) => {
    navigate('/pokedex', { state: { pokemon } })
  }

  return (
    <Container>
      <div className="d-flex mt-3">
        <Form.Select
          style={{
            borderRadius: '20px',
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#f4f4f4',
            border: '2px solid #ccc',
            color: '#333',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
        >
          <option value="1">All gen</option>
          <option value="generation-i">First gen</option>
          <option value="generation-ii">Second gen</option>
          <option value="generation-iii">Third gen</option>
          <option value="generation-iv">Fourth gen</option>
          <option value="generation-v">Fifth gen</option>
          <option value="generation-vi">Sixth gen</option>
          <option value="generation-vii">Seventh gen</option>
          <option value="generation-viii">Eigth gen</option>
          <option value="generation-ix">Ninth gen</option>
        </Form.Select>
        <Form.Select
          style={{
            borderRadius: '20px',
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#f4f4f4',
            border: '2px solid #ccc',
            color: '#333',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All types</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ghost">Ghost</option>
          <option value="dark">Dark</option>
          <option value="flying">Flying</option>
          <option value="normal">Normal</option>
          <option value="ice">Ice</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
          <option value="bug">Bug</option>
          <option value="psychic">Psychic</option>
          <option value="dragon">Dragon</option>
        </Form.Select>
      </div>
      <input
        placeholder="Search Pokémon"
        className="input-pokemon"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Row>
        {filteredPokemons.map((pokemon, index) => {
          if (!pokemon) {
            return (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Text>Details not found</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
          const backgroundImage =
            typeToBackground[pokemon.types[0]?.type.name] || normalCard
          const isCaptured = capturedPokemonIds.has(pokemon.id)
          return (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: '25rem',
                  height: '35rem',
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                }}
                className="m-3"
              >
                <Card.Title className="text-center mt-4">
                  <div className="position-relative">
                    <img
                      width="70px"
                      className="caught"
                      src={caught}
                      alt="Catch Pokémon"
                      onClick={() => handleCapture(pokemon)}
                    />
                  </div>
                  {pokemon.name.toUpperCase()}
                </Card.Title>
                <Card.Img
                  variant="top"
                  style={{ height: '14rem', objectFit: 'contain' }}
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                />
                <div
                  style={{ cursor: 'pointer' }}
                  className="d-flex justify-content-center mt-3"
                  onClick={() => pokedex(pokemon)}
                >
                  <img width="80px" src={iconPokedex} alt="Pokedex" />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    {isCaptured && (
                      <img src={Ncatch} width="80px" alt="Captured" />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Box

// import React, { useEffect, useState } from 'react'
// import { Card, Container, Row, Col, Button } from 'react-bootstrap'
// import normalCard from '../card-normal.png'
// import bugCard from '../card-bug.png'
// import darkCard from '../card-dark.png'
// import dragonCard from '../card-dragon.png'
// import electricCard from '../card-electric.png'
// import fairyCard from '../card-fairy.png'
// import fightCard from '../card-fight.png'
// import ghostCard from '../card-ghost.png'
// import grassCard from '../card-grass.png'
// import iceCard from '../card-ice.png'
// import poisonCard from '../card-poison.png'
// import psychicCard from '../card-psychic.jpg'
// import rockCard from '../card-rock.png'
// import steelCard from '../card-steel.png'
// import waterCard from '../card-water.png'
// import fireCard from '../card-fire.png'
// import groundCard from '../card-ground.png'
// import flyCard from '../card-fly.png'
// import iconPokedex from '../iconPokedex.png'
// import caught from '../caught.png'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCaptured, removeFromCaptured } from '../redux/captured'
// import Ncatch from '../Ncatch.png'
// import { Form } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'

// function Box({ data }) {
//   const [detailedPokemons, setDetailedPokemons] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [generation, setGeneration] = useState('1')
//   const [type, setType] = useState('all')
//   const [visibleCount, setVisibleCount] = useState(12) // Stato per tenere traccia dei Pokémon visibili
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const capturedPokemons = useSelector(
//     (state) => state.captured.capturedPokemons
//   )
//   const capturedPokemonIds = new Set(
//     capturedPokemons.map((pokemon) => pokemon.id)
//   )

//   const typeToBackground = {
//     steel: steelCard,
//     psychic: psychicCard,
//     ghost: ghostCard,
//     fire: fireCard,
//     ice: iceCard,
//     water: waterCard,
//     electric: electricCard,
//     fighting: fightCard,
//     ground: groundCard,
//     poison: poisonCard,
//     grass: grassCard,
//     rock: rockCard,
//     bug: bugCard,
//     dark: darkCard,
//     fairy: fairyCard,
//     normal: normalCard,
//     dragon: dragonCard,
//     flying: flyCard,
//   }

//   const fetchWithCache = (() => {
//     const cache = new Map()

//     return async (url) => {
//       if (cache.has(url)) {
//         return cache.get(url)
//       }
//       try {
//         const response = await fetch(url)
//         if (!response.ok) throw new Error('Errore nel fetch')
//         const data = await response.json()
//         cache.set(url, data)
//         return data
//       } catch (error) {
//         console.error(`Errore nel fetch per ${url}:`, error.message)
//         return null
//       }
//     }
//   })()

//   const fetchDetailsInBatches = async (data, batchSize) => {
//     const results = []
//     for (let i = 0; i < data.length; i += batchSize) {
//       const batch = data.slice(i, i + batchSize)
//       const batchResults = await Promise.all(
//         batch.map(async (pokemon) => {
//           try {
//             const details = await fetchWithCache(pokemon.url)
//             const species = await fetchWithCache(details.species.url)
//             return { ...details, species }
//           } catch (error) {
//             console.error(
//               `Errore nel fetch dei dettagli per ${pokemon.name}:`,
//               error.message
//             )
//             return null
//           }
//         })
//       )
//       results.push(...batchResults)
//     }
//     return results.filter((pokemon) => pokemon !== null)
//   }

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const details = await fetchDetailsInBatches(data, 50)
//         setDetailedPokemons(details)
//       } catch (error) {
//         console.error('Errore durante il fetch:', error.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (data.length > 0) {
//       fetchDetails()
//     }
//   }, [data])

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: '100vh' }}
//       >
//         <div className="ball"></div>
//       </div>
//     )
//   }

//   const filteredPokemons = detailedPokemons
//     .filter((pokemon) =>
//       pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((pokemon) => {
//       if (generation === '1') return true
//       return pokemon.species.generation.name === generation
//     })
//     .filter((pokemon) => {
//       if (type === 'all') return true
//       return pokemon.types.some((t) => t.type.name === type)
//     })

//   const handleCapture = (pokemon) => {
//     dispatch(addToCaptured(pokemon))
//   }

//   const pokedex = (pokemon) => {
//     navigate('/pokedex', { state: { pokemon } })
//   }

//   const handleShowMore = () => {
//     setVisibleCount((prevCount) => prevCount + 12)
//   }

//   return (
//     <Container>
//       <div className="d-flex mt-3">
//         <Form.Select
//           style={{
//             borderRadius: '20px',
//             padding: '10px',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             backgroundColor: '#f4f4f4',
//             border: '2px solid #ccc',
//             color: '#333',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             transition: 'all 0.3s ease',
//             cursor: 'pointer',
//           }}
//           value={generation}
//           onChange={(e) => setGeneration(e.target.value)}
//         >
//           <option value="1">All gen</option>
//           <option value="generation-i">First gen</option>
//           <option value="generation-ii">Second gen</option>
//           <option value="generation-iii">Third gen</option>
//           <option value="generation-iv">Fourth gen</option>
//           <option value="generation-v">Fifth gen</option>
//           <option value="generation-vi">Sixth gen</option>
//           <option value="generation-vii">Seventh gen</option>
//           <option value="generation-viii">Eigth gen</option>
//           <option value="generation-ix">Ninth gen</option>
//         </Form.Select>
//         <Form.Select
//           style={{
//             borderRadius: '20px',
//             padding: '10px',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             backgroundColor: '#f4f4f4',
//             border: '2px solid #ccc',
//             color: '#333',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             transition: 'all 0.3s ease',
//             cursor: 'pointer',
//           }}
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//         >
//           <option value="all">All types</option>
//           <option value="grass">Grass</option>
//           <option value="fire">Fire</option>
//           <option value="water">Water</option>
//           <option value="electric">Electric</option>
//           <option value="rock">Rock</option>
//           <option value="ground">Ground</option>
//           <option value="fighting">Fighting</option>
//           <option value="poison">Poison</option>
//           <option value="ghost">Ghost</option>
//           <option value="dark">Dark</option>
//           <option value="flying">Flying</option>
//           <option value="normal">Normal</option>
//           <option value="ice">Ice</option>
//           <option value="steel">Steel</option>
//           <option value="fairy">Fairy</option>
//           <option value="bug">Bug</option>
//           <option value="psychic">Psychic</option>
//           <option value="dragon">Dragon</option>
//         </Form.Select>
//       </div>
//       <input
//         placeholder="Search Pokémon"
//         className="input-pokemon"
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       <Row>
//         {filteredPokemons.slice(0, visibleCount).map((pokemon, index) => {
//           if (!pokemon) {
//             return (
//               <Col key={index} xs={12} sm={6} md={4} lg={3}>
//                 <Card className="m-3">
//                   <Card.Body>
//                     <Card.Text>Details not found</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             )
//           }
//           const backgroundImage =
//             typeToBackground[pokemon.types[0]?.type.name] || normalCard
//           const isCaptured = capturedPokemonIds.has(pokemon.id)
//           return (
//             <Col key={index} xs={12} md={6} lg={4}>
//               <Card
//                 style={{
//                   width: '25rem',
//                   height: '35rem',
//                   backgroundImage: `url(${backgroundImage})`,
//                   backgroundSize: 'cover',
//                 }}
//                 className="m-3"
//               >
//                 <Card.Title className="text-center mt-4">
//                   <div className="position-relative">
//                     <img
//                       width="70px"
//                       className="caught"
//                       src={caught}
//                       alt="Catch Pokémon"
//                       onClick={() => handleCapture(pokemon)}
//                     />
//                   </div>
//                   {pokemon.name.toUpperCase()}
//                 </Card.Title>
//                 <Card.Img
//                   variant="top"
//                   style={{ height: '14rem', objectFit: 'contain' }}
//                   src={pokemon.sprites.other['official-artwork'].front_default}
//                   alt={pokemon.name}
//                 />
//                 <div
//                   style={{ cursor: 'pointer' }}
//                   className="d-flex justify-content-center mt-3"
//                   onClick={() => pokedex(pokemon)}
//                 >
//                   <img width="80px" src={iconPokedex} alt="Pokedex" />
//                 </div>
//                 <Card.Body>
//                   <div className="d-flex justify-content-center">
//                     {isCaptured && (
//                       <img src={Ncatch} width="80px" alt="Captured" />
//                     )}
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           )
//         })}
//       </Row>

//       {visibleCount < filteredPokemons.length && (
//         <div className="d-flex justify-content-center mt-3">
//           <Button variant="primary" onClick={handleShowMore}>
//             Show More
//           </Button>
//         </div>
//       )}
//     </Container>
//   )
// }

// export default Box
