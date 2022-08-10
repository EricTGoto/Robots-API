const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Robot = require('../models/robot');

const initialRobots = [
  {
    name: 'Robo1',
    ownerID: 'Boston Robonamics',
    identifier: 'UDAS91',
  },
  {
    name: 'Robo2',
    ownerID: 'Boston Robonamics',
    identifier: 'AGAG18',
  },
];

beforeEach(async () => {
  await Robot.deleteMany({});
  let robotObject = new Robot(initialRobots[0]);
  await robotObject.save();
  robotObject = new Robot(initialRobots[1]);
  await robotObject.save();
});

test('response is returned as json', async () => {
  await api
    .get('/api/robots')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all robots are returned', async () => {
  const response = await api
    .get('/api/robots')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialRobots.length);
});

test('specific robot is returned via identifier', async () => {
  const resultRobot = await api
    .get(`/api/robots/${initialRobots[0].identifier}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const robotAsJSON = JSON.parse(JSON.stringify(initialRobots[0]));
  expect(resultRobot.body).toEqual(robotAsJSON);
});

test('invalid identifier returns 404', async () => {
  await api
    .get('/api/robots/invalididentifier')
    .expect(404);
});

test('a valid robot can be added', async () => {
  const newRobot = {
    name: 'Robo3',
    ownerID: 'MUSK CORP',
    identifier: 'muskSTINKY',
  };

  await api
    .post('/api/robots')
    .send(newRobot)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/robots');
  const contents = response.body.map((r) => r.name);

  expect(response.body).toHaveLength(initialRobots.length + 1);
  expect(contents).toContain('Robo3');
});

test('robot without content is not added', async () => {
  const newRobot = {

  };

  const postResponse = await api
    .post('/api/robots')
    .send(newRobot)
    .expect(400);

  expect(postResponse.body.error).toEqual('malformed request');
  const response = await api.get('/api/robots');
  expect(response.body).toHaveLength(initialRobots.length);
});

test('robot without ownerID is not added', async () => {
  const newRobot = {
    name: 'RoboRobo',
    identifier: 'UUHS1',
  };

  const postResponse = await api
    .post('/api/robots')
    .send(newRobot)
    .expect(400);

  expect(postResponse.body.error).toEqual('malformed request');
  const response = await api.get('/api/robots');
  expect(response.body).toHaveLength(initialRobots.length);
});

test('robot without name is not added', async () => {
  const newRobot = {
    ownerID: 'D4 Corp',
    identifier: 'AOPAP13',
  };

  const postResponse = await api
    .post('/api/robots')
    .send(newRobot)
    .expect(400);

  expect(postResponse.body.error).toEqual('malformed request');
  const response = await api.get('/api/robots');
  expect(response.body).toHaveLength(initialRobots.length);
});

test('robot without identifier is not added', async () => {
  const newRobot = {
    name: 'Best Robot',
    ownerID: 'Robo Inc',
  };

  const postResponse = await api
    .post('/api/robots')
    .send(newRobot)
    .expect(400);

  expect(postResponse.body.error).toEqual('malformed request');
  const response = await api.get('/api/robots');
  expect(response.body).toHaveLength(initialRobots.length);
});

test('robot without unique identifier is not added', async () => {
  const newRobot = {
    name: 'Robo 9000',
    ownerID: 'Robomart',
    identifier: 'AGAG18',
  };

  const postResponse = await api
    .post('/api/robots')
    .send(newRobot)
    .expect(400);

  expect(postResponse.body.error).toEqual('identifier must be unique');

  const response = await api.get('/api/robots');
  expect(response.body).toHaveLength(initialRobots.length);
});

afterAll(() => {
  mongoose.connection.close();
});
