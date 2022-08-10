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
      if (robot) {
        response.status(200).json(robot);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

robotsAPIRouter.post('/', (request, response, next) => {
  const { name, ownerID, identifier } = request.body;
  const newRobot = new Robot({
    name,
    ownerID,
    identifier,
  });

  newRobot.save()
    .then((savedRobot) => {
      response.status(201).json(savedRobot);
    })
    .catch((error) => next(error));
});

module.exports = robotsAPIRouter;
