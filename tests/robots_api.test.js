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
    NACCS: 'AGAG18',
  },
];

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

afterAll(() => {
  mongoose.connection.close();
});
