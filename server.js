const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  socket.on('chat.message', (data) => {
      console.log('[MESSAGE]: ', data);
      io.emit('chat.message', data);
  })
  socket.on('disconnect', () => {
      console.log('[SOCKET] Desconectou')
  })
});


httpServer.listen(8000, 'localhost', () => {
    console.log('[SERVER] Conexão iniciada.')
});

/*
const koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new koa();
const server = http.createServer(app.callback())
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080

io.on('connection', () => {
    console.log('[IO] Server has a new connection')
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen: Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
    console.log('[HTTP] Please, press CTRL+C to stop IT');
})
*/