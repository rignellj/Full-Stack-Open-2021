import React from 'react';

import Person from './Person';

const Persons = ({ persons, filterName  }) => {
	let content;
	const filteredPersons = persons.filter(person => person.name.includes(filterName));

	if (filteredPersons.length || filterName) {
		content = (
			filteredPersons.map(person => (
				<Person
				key={person.name}
				name={person.name}
				number={person.number}
				/>
			)));
	} else {
		content = (
			persons.map(person => (
				<Person
				key={person.name}
				name={person.name}
				number={person.number}
				/>
			)));
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
