let http = require('http');

let reqmessage = require('./rautor');

const server = http.createServer(reqmessage)

server.listen(4000);