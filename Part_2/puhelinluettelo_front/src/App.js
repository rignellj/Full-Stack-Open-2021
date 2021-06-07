import React, { useState, useEffect } from 'react';

import service from './services/address';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState(undefined);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');
  const [ notification, setNotification ] = useState([null, null]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const filteredPersons = persons.filter(person => person.name === newName.trim());
    const { length } = filteredPersons;

    if (length === 0) {
      const newAddress = {
        name: newName,
        number: newNumber
      };
      service
      .create(newAddress)
      .then(res => {
        setPersons(persons.concat(res.data));
        setNotification([`Added ${newAddress.name}`, 'added']);
      })
      .catch(err => {
        setNotification([`${err.response.data.error}`, null]);
      })
    } else {
      const confirm = window.confirm(`${newName.trim()} is already added to phonebook, replace the old with a new one?`);
      const person = filteredPersons[0];
      
      if (confirm) {
        const updatedAddress = {
          name: newName.trim(),
          number: newNumber
        };
        service
        .update(person.id, updatedAddress)
        .then(res => {
          console.log(res.data);
          setNotification([`Number was changed for ${updatedAddress.name}`, 'changed']);
        })
        .catch(err => {
          console.log(err);
          setNotification([`Address ${updatedAddress.name} was already deleted from server`, null]);
        });
      }
    }
    setTimeout(() => {
      setNotification([null, null])
      }, 5000)
    setNewName('');
    setNewNumber('');
  };

  const onNameChangeHandler = (event) => setNewName(event.target.value);
  
  const onNumberChangeHandler = (event) => setNewNumber(event.target.value);

  const filterCHangeHandler = (event) => setFilterName(event.target.value);

  useEffect(() => {
    service
    .getAll()
    .then(res => {
        console.log(res);
        setPersons(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
   <React.Fragment>
     <h2>Phonebook</h2>
     <Notification notification={notification} />
     <Filter
        filterCHangeHandler={filterCHangeHandler}
        filterName={filterName}
      />
     <h3>Add a new</h3>
      <PersonForm
        onSubmitHandler={onSubmitHandler}
        onNameChangeHandler={onNameChangeHandler}
        onNumberChangeHandler={onNumberChangeHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        setNotification={setNotification}
        filterName={filterName}
        persons={persons}
        setPersons={setPersons}
      />
   </React.Fragment>
  );
}

export default App;
