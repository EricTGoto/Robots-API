# Robots-API

This is an API created with Express, Node, Javascript and MongoDB implementing the functionalities laid out in the design document (see design document.md).

To run locally:
- clone the repository
- make sure you have the latest version of node installed
- run npm install
- create a .env file in the root directory and set the following keys: PORT, MONGO_PW, MONGO_USER, MONGO_CLUSTER
    - MONGO_PW, MONGO_USER, MONGO_CLUSTER can be determined through the MongoDB connection string
        - mongodb+srv://{MONGO_USER}:{MONGO_PW}@{MONGO_CLUSTER}/?retryWrites=true&w=majority
- run npm start to run in production mode
- run npm run dev to run in development mode
- run npm run test to run tests

API is organized as follows:
- index.js is the entry point and creates the server
- index imports app which imports router, middleware, and config
- controllers/robots contains the routing
- models/robots defines the mongoDB schema for the collections
- utils/ contains config and middleware
- tests/ contains the API testing

Language: Javascript (Node.js/Express)
Database: MongoDB 
Libraries that I used:
- express
- mongoose (ORM for mongoDB)
- jest (for testing)
- supertest (for writing tests for APIs)
- nodemon
- cross-env
- dotenv
- eslint