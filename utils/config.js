require('dotenv').config();

const {
  PORT,
  MONGO_USER,
  MONGO_PW,
  MONGO_CLUSTER,
} = process.env;

const database = process.env.NODE_ENV;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_CLUSTER}/${database}?retryWrites=true&w=majority`;

module.exports = {
  PORT,
  MONGO_URI,
};
