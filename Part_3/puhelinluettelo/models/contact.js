const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(res => {
	console.log('connected to MongoDB')
})
.catch(err => {
	console.log('error connecting to MongoDB: ', err.message)
});

const contactSchema = new mongoose.Schema({
	name: String,
	number: String
});

contactSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
});

module.exports = mongoose.model('Contact', contactSchema);
