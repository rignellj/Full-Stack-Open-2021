const initialUsers = [
	{
		username: 'jrignell',
		password: '123456789',
		name: 'Jere Rignell'
	},
	{
		username: 'hellas',
		password: '123456789',
		name: 'Arto Hellas'
	},
	{
		username: 'mluukkai',
		password: '123456789',
		name: 'Matti Luukkainen'
	}
];

const invalidUser = {
	name: 'Martta'
}

const invalidUser2 = {
	name: 'Martta',
	username: 'marttaOnHirmuinenKartta',
	password: '0'
}

const apiURL = '/api/users';

module.exports = { initialUsers, apiURL, invalidUser, invalidUser2 };