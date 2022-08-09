const express = require('express');

const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log('error happened connecting to mongoDB', err);
  });

app.use(express.json());

module.exports = app;
