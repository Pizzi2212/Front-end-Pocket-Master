import { createSlice } from '@reduxjs/toolkit'

const capturedSlice = createSlice({
  name: 'captured',
  initialState: {
    capturedPokemons: [],
  },
  reducers: {
    addToCaptured: (state, action) => {
      // Aggiunge un Pokémon alla lista dei catturati
      state.capturedPokemons.push(action.payload)
    },
    removeFromCaptured: (state, action) => {
      // Rimuove un Pokémon dalla lista dei catturati
      state.capturedPokemons = state.capturedPokemons.filter(
        (pokemon) => pokemon.id !== action.payload.id
      )
    },
  },
})

export const { addToCaptured, removeFromCaptured } = capturedSlice.actions
export default capturedSlice.reducer
