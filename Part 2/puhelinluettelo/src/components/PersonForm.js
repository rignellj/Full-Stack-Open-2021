import React from 'react';

const PersonForm = ({
		onSubmitHandler,
		onNameChangeHandler,
		newName,
		onNumberChangeHandler,
		newNumber
	}) => {
	return (
		<form onSubmit={onSubmitHandler}>
			<div>
				name: <input onChange={onNameChangeHandler} value={newName} />
			</div>
			<div>
				number: <input onChange={onNumberChangeHandler} value={newNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
      </form>
	);
};

export default PersonForm;
