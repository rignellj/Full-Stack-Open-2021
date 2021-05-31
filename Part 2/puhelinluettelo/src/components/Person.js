import React from 'react';

const Person = ({ name, number }) => {
	return (
	  <React.Fragment>
		<tr>
		  <td>{name}</td>
		  <td>{number}</td>
		</tr>
	  </React.Fragment>
	);
};

export default Person;
