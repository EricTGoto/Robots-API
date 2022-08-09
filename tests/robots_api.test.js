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

afterAll(() => {
  mongoose.connection.close();
});
