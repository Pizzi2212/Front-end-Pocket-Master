import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

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

const initialState = {
  userId: getUserIdFromToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload
      localStorage.setItem('token', action.payload)
    },
    logoutUser(state) {
      state.userId = null
      localStorage.removeItem('token')
    },
  },
})

export const { setUser, logoutUser } = authSlice.actions
export default authSlice.reducer
