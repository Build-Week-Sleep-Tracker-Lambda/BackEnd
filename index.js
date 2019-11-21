require('dotenv').config();
const server = require('./api/server.js');

const port = process.env.PORT || 3300;

server.listen(port, function (){
    console.log(`\n *** Service is running on localhost:${port}***\n`)
})