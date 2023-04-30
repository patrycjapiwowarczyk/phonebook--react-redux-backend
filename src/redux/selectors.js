import { createSelector } from '@reduxjs/toolkit';

export const selectedContacts = state => state.contacts.items;

export const contactsIsLoading = state => state.contacts.isLoading;

export const contactsError = state => state.contacts.error;

export const selectedFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectedContacts, selectedFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
