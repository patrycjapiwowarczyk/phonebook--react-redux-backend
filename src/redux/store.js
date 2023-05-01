import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './slice';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  middleware: [thunkMiddleware],
});
