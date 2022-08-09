const robotsAPIRouter = require('express').Router();
const Robot = require('../models/robot');

robotsAPIRouter.get('/', (request, response, next) => {
  Robot.find({})
    .then((robots) => {
      response.status(200).json(robots);
    })
    .catch((error) => next(error));
});

robotsAPIRouter.get('/:identifier', (request, response, next) => {
  Robot.findOne({ identifier: request.params.identifier })
    .then((robot) => {
      response.status(200).json(robot);
    })
    .catch((error) => next(error));
});

module.exports = robotsAPIRouter;
