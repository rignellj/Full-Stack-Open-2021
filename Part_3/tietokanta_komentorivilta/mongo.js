const mongoose = require('mongoose');

let name = null;
let number = null;

if (process.argv.length == 5) {
	name = process.argv[3];
	number = process.argv[4];
} else if (process.argv.length == 3) {
} else {
	console.log('Give password, name and number as argument');
	console.log('OR');
	console.log('Give just password to get all records from database');
	console.log('Exiting with 1');
	process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://tunnus:${password}@cluster0.gmzxx.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const contactSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Contact = mongoose.model('Contact', contactSchema);


if (name && number) {
	const contact = new Contact({
		name: name,
		number: number
	});
	contact.save()
	.then(res => {
		console.log(`Contact name: ${name}, number: ${number} saved to phonebook!`);
		console.log(res);
		mongoose.connection.close();
	});
} else {
	Contact.find({})
	.then(res => {
		console.log('Phonebook:');
		res.forEach(contact => console.log(`${contact.name} ${contact.number}`));
		mongoose.connection.close();
	});
}
