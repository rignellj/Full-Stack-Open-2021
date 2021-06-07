const config = require('./utils/config');
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('error connecting to MongoDB: ', err.message));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
