import { createSlice } from '@reduxjs/toolkit'

const loadCapturedFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem('capturedPokemons')
    return serializedData ? JSON.parse(serializedData) : []
  } catch (error) {
    console.error(
      'Errore durante il caricamento dei Pokémon da localStorage',
      error
    )
    return []
  }
}

const saveCapturedToLocalStorage = (capturedPokemons) => {
  try {
    const serializedData = JSON.stringify(capturedPokemons)
    localStorage.setItem('capturedPokemons', serializedData)
  } catch (error) {
    console.error(
      'Errore durante il salvataggio dei Pokémon in localStorage',
      error
    )
  }
}

const capturedSlice = createSlice({
  name: 'captured',
  initialState: {
    capturedPokemons: loadCapturedFromLocalStorage(),
  },
  reducers: {
    addToCaptured(state, action) {
      state.capturedPokemons.push(action.payload)
      saveCapturedToLocalStorage(state.capturedPokemons)
    },
    removeFromCaptured(state, action) {
      state.capturedPokemons = state.capturedPokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      )
      saveCapturedToLocalStorage(state.capturedPokemons)
    },
  },
})

export const { addToCaptured, removeFromCaptured } = capturedSlice.actions

export default capturedSlice.reducer
