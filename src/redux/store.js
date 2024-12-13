import { configureStore } from '@reduxjs/toolkit'
import capturedReducer from './captured'

const store = configureStore({
  reducer: {
    captured: capturedReducer,
  },
})

export default store
