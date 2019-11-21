const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../routes/auth/authenticate-middleware.js');
const authRouter = require('../routes/auth/auth-router.js');
const sleepRouter = require('../routes/sleep-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/sleep', sleepRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "api is live"})
})

module.exports = server;
