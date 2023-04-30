import { createSlice } from '@reduxjs/toolkit';
import { fetchingContacts, addingContact, deletingContact } from './fetching';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchingContacts.pending]: handlePending,
    [fetchingContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchingContacts.rejected]: handleRejected,
    [addingContact.pending]: handlePending,
    [addingContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addingContact.rejected]: handleRejected,
    [deletingContact.pending]: handlePending,
    [deletingContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deletingContact.rejected]: handleRejected,
  },
});

const fitlerInitialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: fitlerInitialState,
  reducers: {
    filterChange: {
      reducer(state, action) {
        return action.payload;
      },
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { filterChange } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
