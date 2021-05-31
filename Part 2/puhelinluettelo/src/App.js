import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { length } = persons.filter(person => person.name === newName.trim());

    if (length === 0) {
      const newAddress = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newAddress));
    } else {
      alert(`${newName.trim()} is already added to phonebook`);
    }
    setNewName('');
    setNewNumber('');
  };

  const onNameChangeHandler = (event) => setNewName(event.target.value);
  
  const onNumberChangeHandler = (event) => setNewNumber(event.target.value);

  const filterCHangeHandler = (event) => setFilterName(event.target.value);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
        setPersons(res.data);
    });
  }, []);

  return (
   <React.Fragment>
     <h2>Phonebook</h2>
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
        filterName={filterName}
        persons={persons}
      />
   </React.Fragment>
  );
}

export default App;
