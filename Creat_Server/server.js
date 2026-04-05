const fs = require('fs');
const http = require('http');
const path = require('path');


const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/' && method === 'GET'){
        res.end("home page");
    }

});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


const express = require('express');
const app2 = express();
const PORT = 1000;

app2.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app2.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});