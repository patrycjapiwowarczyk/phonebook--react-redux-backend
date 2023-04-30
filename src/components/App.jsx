import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import css from './App.module.css';
import { useDispatch } from 'react-redux';
import { fetchingContacts } from 'redux/fetching';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingContacts());
  }, [dispatch]);

  return (
    <div className={css['container']}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <ContactFilter />
      <ContactList />
    </div>
  );
};
