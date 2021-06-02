import axios from 'axios';

const BASEURL = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(BASEURL);
};

const create = newAddressObject => {
	return axios.post(BASEURL, newAddressObject);
};

const deleteAddress = id => {
	return axios.delete(`${BASEURL}/${id}`);
};

const update = (id, addressObject) => {
	return axios.put(`${BASEURL}/${id}`, addressObject);
};

const service = { getAll, create, deleteAddress, update };

export default service;
