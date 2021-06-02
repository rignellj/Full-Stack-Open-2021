import React from 'react';

const Weather = ({ weather, capital }) => {
	let content;
	
	if (weather === undefined) {
	  content = <p></p>
	} else {
	  const { temperature, weather_icons } = weather.current
	  content = (
		<React.Fragment>
		  <p>Temperature: {temperature} °C</p>
		  <img src={weather_icons} style={{width:"5rem", height:"auto"}} alt="weather" />
		</React.Fragment>
	  )
	}

	return (
	  <React.Fragment>
		<h3>Weather in {capital}</h3>
		{content}
	  </React.Fragment>
	);
};

export default Weather;
