import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    counter: authReducer,
    // Add more reducers as needed
  },
});