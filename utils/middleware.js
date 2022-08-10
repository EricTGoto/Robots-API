const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'malformed request' });
  } else if (error.code === 11000) {
    return response.status(400).send({ error: 'identifier must be unique' });
  }
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
