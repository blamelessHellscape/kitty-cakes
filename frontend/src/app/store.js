import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import streamButtonReducer from '../pages/streamButtonSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    streamButton: streamButtonReducer
  },
});
