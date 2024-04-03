import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';

const mockapiURL =
  'https://644c175d17e2663b9d000555.mockapi.io/phonebook--react-redux-backend/contacts';

const initialState = {
  contacts: [],
  searchTerm: '',
  status: 'idle',
  error: null,
};

export const fetchingContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(mockapiURL);
    return response.data;
  }
);

export const addingContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { getState }) => {
    try {
      const state = getState();
      const contactAlreadyExist = state.contacts.contacts.find(
        e => e.phone === contact.phone
      );
      if (contactAlreadyExist) {
        Notify.warning('Contact already exist');
        return;
      }

      const response = await axios.post(mockapiURL, contact);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deletingContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      await axios.delete(`${mockapiURL}/${contactId}`);
      return contactId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchingContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchingContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchingContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addingContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(addingContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.contacts.push(action.payload);
        }
      })
      .addCase(addingContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletingContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(deletingContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload
        );
        if (index !== -1) {
          state.contacts.splice(index, 1);
        }
      })
      .addCase(deletingContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { setSearchTerm } = contactsSlice.actions;
