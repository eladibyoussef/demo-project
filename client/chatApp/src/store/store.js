import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/feature/useSlice'
export const store = configureStore({
  reducer: {
     user : userReducer
  },
})