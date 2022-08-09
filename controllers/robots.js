const robotsAPIRouter = require('express').Router();
const Robot = require('../models/robot');

robotsAPIRouter.get('/', (request, response, next) => {
  Robot.find({})
    .then((robots) => {
      response.status(200).json(robots);
    })
    .catch((error) => next(error));
});

module.exports = robotsAPIRouter;
