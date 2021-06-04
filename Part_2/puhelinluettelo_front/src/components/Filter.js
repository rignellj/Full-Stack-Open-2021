import React from 'react';

const Filter = ({ filterName, filterCHangeHandler }) => {
	return (
		<div>
      	  filter: <input onChange={filterCHangeHandler} value={filterName} />
      	</div>
	);
};

export default Filter;
