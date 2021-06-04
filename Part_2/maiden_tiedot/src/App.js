import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Countries from './components/Countries';
import './App.css';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ countryName, setCountryName ] = useState([]);
  const countriesURL = 'https://restcountries.eu/rest/v2/all';
  
  const inputChangeHandler = (event) => setCountryName(event.target.value);

  useEffect(() => {
    axios.get(countriesURL)
    .then(res => {
      setCountries(res.data)
    });
  }, []);

  return (
    <React.Fragment>
      <h1>Find Countries</h1>
      <input value={countryName} onChange={inputChangeHandler} />
      <Countries countries={countries} countryName={countryName} setCountryName={setCountryName} />
    </React.Fragment>
  );
}

export default App;
