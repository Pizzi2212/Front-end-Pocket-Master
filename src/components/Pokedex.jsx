import pokedex from '../pokedex.jpg'

const Pokedex = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${pokedex})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
      }}
    ></div>
  )
}
export default Pokedex
