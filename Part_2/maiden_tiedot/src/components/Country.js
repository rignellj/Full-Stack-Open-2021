import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Weather from './Weather';

const Country = ({ country }) => {
	const { name, capital, languages, population, flag } = country;
	const api_key = process.env.REACT_APP_API_KEY;
	const [ weather, setWeather ] = useState(undefined);
	const weatherURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`

	useEffect(() => {
	  axios.get(weatherURL)
	  .then(res => {
		setWeather(res.data);
	  });
	}, [weatherURL]);
  
	return (
	  <React.Fragment>
		<h2>{name}</h2>
		<p>Capital: {capital}</p>
		<p>Population: {population}</p>
		<h3>Languages</h3>
		<ul>
		  {languages.map(language => <li key={language.name}>{language.name}</li>)}
		</ul>
		<img src={flag} style={{width:"5rem", height:"auto"}} alt="flag" />
		<Weather capital={capital} weather={weather} />
	  </React.Fragment>
	);
};

export default Country;
