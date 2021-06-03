import React from 'react';

import Person from './Person';

const Persons = ({ persons, filterName, setPersons, setNotification  }) => {
	let content;
	if (persons === undefined) {
		return <p>Loading...</p>;
	}
	const filteredPersons = persons.filter(person => person.name.includes(filterName));
	if (filteredPersons.length || filterName) {
		content = (
			filteredPersons.map(person => (
				<Person
					setNotification={setNotification}
					setPersons={setPersons}
					id={person.id}
					key={person.name}
					name={person.name}
					number={person.number}
				/>
			)
		));
	} else {
		content = (
			persons.map(person => (
				<Person
					setNotification={setNotification}
					setPersons={setPersons}
					id={person.id}
					key={person.name}
					name={person.name}
					number={person.number}
				/>
			)
		));
	}

	return (
		<table>
        	<tbody>
          		{content}
       	 	</tbody>
      </table>
	);
};

export default Persons;
