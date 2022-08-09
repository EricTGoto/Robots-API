const express = require('express');

const app = express();
const mongoose = require('mongoose');
const robotsAPIRouter = require('./controllers/robots');
const middleware = require('./utils/middleware');
const config = require('./utils/config');

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log('error happened connecting to mongoDB', err);
  });

app.use(express.json());
app.use('/api/robots', robotsAPIRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
