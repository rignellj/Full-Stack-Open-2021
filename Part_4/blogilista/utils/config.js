require('dotenv').config();

let MONGODB_URI;

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI;
} else {
	MONGODB_URI = process.env.MONGODB_URI;
}

const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 3003;

module.exports = { MONGODB_URI, PORT, SECRET };
