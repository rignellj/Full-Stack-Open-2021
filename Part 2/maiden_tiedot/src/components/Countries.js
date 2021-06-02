import React from 'react';

import Country from './Country';

const Countries = ({ countries, countryName, setCountryName }) => {
	const filteredCountries = countries.filter(country => country.name.includes(countryName));
	const { length }  = filteredCountries;
	let content;
  
	const showCountryHandler = (event) => {
	  setCountryName(event.target.value);
	};
  
	if (length > 10) {
	  content = <p>Too many matches, specify another filter</p>
	} else if (length <= 10 && length > 1) {
	  content = (
		filteredCountries.map(country => (
		  <p key={country.name}>{country.name}
			  <button
					onClick={showCountryHandler}
					value={country.name}>Show
			  </button>
		  </p>
  
	  )))
	} else if (length === 1) {
	  content = <Country country={filteredCountries[0]} />
	}
	return (
	  <React.Fragment>
		{content}
	  </React.Fragment>
	);
};

export default Countries;
