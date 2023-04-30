import React from 'react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { contactsIsLoading, selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(contactsIsLoading);

  return (
    <ul className={css['contact-list']}>
      {isLoading && <div>Contacts list updating...</div>}
      {!!contacts &&
        contacts.map(contact => <ContactListItem contact={contact} />)}
    </ul>
  );
};
