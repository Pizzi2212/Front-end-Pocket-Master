import { configureStore } from '@reduxjs/toolkit'
import capturedReducer from './capturedSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    captured: capturedReducer,
  },
})

export default store
