import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  'https://644c175d17e2663b9d000555.mockapi.io/goit-react-hw-07-phonebook';

export const fetchingContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunk) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

export const addingContact = createAsyncThunk(
  'contacts/addContact',
  async ({ contact, state }, thunk) => {
    try {
      const response = await axios.post('/contacts', { contact });
      return response.data;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

export const deletingContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunk) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);
