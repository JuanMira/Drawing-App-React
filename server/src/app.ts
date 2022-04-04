import express from "express";
import http from "http";
import { Server } from "socket.io";
import { config } from "./config";
import socket from "./socket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.origin,
    credentials: false,
  },
});

server.listen(3000, () => {
  console.log("Listening on 3000");
  socket({ io });
});
