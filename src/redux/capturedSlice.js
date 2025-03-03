import { createSlice } from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode'

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    return decoded.userId
  } catch (error) {
    console.error('Errore nella decodifica del token:', error)
    return null
  }
}

const loadCapturedFromLocalStorage = (userId) => {
  try {
    const serializedData = localStorage.getItem(`capturedPokemons_${userId}`)
    return serializedData ? JSON.parse(serializedData) : []
  } catch (error) {
    console.error(
      'Errore durante il caricamento dei Pokémon da localStorage',
      error
    )
    return []
  }
}

const saveCapturedToLocalStorage = (userId, capturedPokemons) => {
  try {
    const serializedData = JSON.stringify(capturedPokemons)
    localStorage.setItem(`capturedPokemons_${userId}`, serializedData)
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
    userId: getUserIdFromToken(),
    capturedPokemons: [],
  },
  reducers: {
    addToCaptured(state, action) {
      if (!state.userId) return
      if (
        !state.capturedPokemons.some(
          (pokemon) => pokemon.id === action.payload.id
        )
      ) {
        state.capturedPokemons.push(action.payload)
        saveCapturedToLocalStorage(state.userId, state.capturedPokemons)
      }
    },
    removeFromCaptured(state, action) {
      if (!state.userId) return
      state.capturedPokemons = state.capturedPokemons.filter(
        (pokemon) => pokemon.id !== action.payload
      )
      saveCapturedToLocalStorage(state.userId, state.capturedPokemons)
    },
    setUser(state, action) {
      // ✅ Spostiamo `setUser` qui per aggiornare i Pokémon dell'utente
      state.userId = action.payload
      state.capturedPokemons = loadCapturedFromLocalStorage(action.payload)
    },
    logoutUser(state) {
      state.userId = null
      state.capturedPokemons = []
    },
  },
})

export const { addToCaptured, removeFromCaptured, setUser, logoutUser } =
  capturedSlice.actions
export default capturedSlice.reducer
