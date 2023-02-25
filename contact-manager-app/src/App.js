import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { v4 as uuidv4 } from 'uuid';
import api from '../src/api/contacts';


function App() {
  const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  //ajout d'un contact
  const addContactHandler = async (contact) => {
    //console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data])
  }

  //modification d'un contact
  const editContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const { id, name, email } = response.data
    // console.log(response.data);
    setContacts(contacts.map(contact => {
      return contact.id === id ? { ...response.data } : contact
    }))
    console.log(contacts);
  }

  //suppression d'un contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id
    })
    setContacts(newContactList)
  }

  //filtre de recherches
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact.email && contact.name)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // if (retrieveContacts) {
    //   setContacts(retrieveContacts)
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      setContacts(allContacts)
    }
    getAllContacts();
    // console.log(retrieveContacts);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit" element={<EditContact editContactHandler={editContactHandler} />} />
          <Route path="/" element={<ContactList contacts={searchTerm < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
        {/* <AddContact addContactHandler={addContactHandler} /> */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
