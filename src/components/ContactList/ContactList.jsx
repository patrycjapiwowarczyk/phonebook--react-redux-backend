import React, { useEffect } from 'react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingContacts } from 'redux/slice';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const searchTerm = useSelector(state => state.contacts.searchTerm);
  const status = useSelector(state => state.contacts.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingContacts());
  }, [dispatch]);

  const visibleContacts =
    contacts &&
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      {status === 'loading' ? (
        <div>Updating contacts list...</div>
      ) : (
        <ul className={css['contact-list']}>
          {visibleContacts.map(contact => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </div>
  );
};
