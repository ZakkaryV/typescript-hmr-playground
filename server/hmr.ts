import * as WebSocket from "ws";

let sockets = [];

const server = new WebSocket.Server({
  port: 3031
});

server.on("connection", socket => {
  sockets.push(socket);

  socket.on("message", msg => {
    if (msg === "RELOAD") sockets.forEach(s => s.send(msg));
  });

  socket.on("close", () => {
    sockets = sockets.filter(s => s !== socket);
  });
});
