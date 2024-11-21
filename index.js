const path = require("path");
const express = require('express');
const app = express();

const http = require("http");
const server = http.createServer(app);

const port = 3456;

app.use(express.static('./public/'));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/index.html'))
})

app.get('/nav-header', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './nav-file.html'))
})

server.listen(port, () => {
    console.log("Server Initiated.");
})