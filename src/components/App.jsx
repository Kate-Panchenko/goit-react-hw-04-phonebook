import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { Title } from "./ContactForm/ContactForm.styled";
import { ThemeProvider } from 'styled-components';
import { theme } from './Layout';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? []
  });
  const [filter, setFilter] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  useEffect(() => {
    const lowerCaseFilter = filter.toLowerCase();
    setFilteredContacts(contacts.filter(contact =>
    contact.name.toLowerCase().includes(lowerCaseFilter)))
  }, [filter, contacts]);

  const contactFilter = e => {
    setFilter(e.target.value)
  }

  const addContact = contact => {
    if (contacts.find(user => user.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = { id: nanoid(), ...contact };
      setContacts([...contacts, newContact]);
    }
  }

  const deleteContact = evt => {
    const contactId = evt.target.id;
    setContacts(contacts.filter(contact => contact.id !== contactId ))
  }

  return (
    <ThemeProvider theme={theme}>
        <Layout>
          <GlobalStyle />
          <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
        <Title>Contacts</Title>
        <Filter value={filter} onChange={contactFilter} />
          <ContactList contacts={filteredContacts} onClick={deleteContact} />
        </Layout>
      </ThemeProvider>
  )

}

