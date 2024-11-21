const { createServer } = require('node:http');
const path = require("path");
const express = require('express');
const app = express();

const http = require("http");
const server = http.createServer(app);

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('./public/'));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/ed.html'))
})

server.listen(port, () => {
    console.log("Server Initiated.");
})