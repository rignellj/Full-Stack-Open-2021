import React from 'react';

import service from '../services/address';

const Person = ({ name, number, id, setPersons, setNotification }) => {
	const deleteHandler = (id) => {
		const confirm = window.confirm(`Delete ${name}?`);
		if (confirm) {
			service
			.deleteAddress(id)
			.then(res => {
				console.log(res, 'delete address');
			})
			setNotification([`Deleted ${name}`, 'deleted'])
			setTimeout(() => {
				setNotification([null, null])
			  }, 5000)
			service
			.getAll()
			.then(res => {
				setPersons(res.data);
			});
		}
	};
	return (
	  <React.Fragment>
		<tr>
		  <td>{name}</td>
		  <td>{number}</td>
		  <td><button onClick={() => deleteHandler(id)}>Delete</button></td>
		</tr>
	  </React.Fragment>
	);
};

export default Person;
