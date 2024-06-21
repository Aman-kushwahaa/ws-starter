const express = require("express");
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080);
console.log("port started");

const wss = new WebSocketServer({ server: httpServer });
let usercount = 0;
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log("user connected" + usercount++);
  ws.send("Hello! Message From Server!!");
});
