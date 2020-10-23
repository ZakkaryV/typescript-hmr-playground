import * as WebSocket from "ws";

let sockets = [];

export const initHotModuleReloading = (httpServer) => {
  const server = new WebSocket.Server({
    server: httpServer,
  });

  server.on("connection", (socket) => {
    sockets.push(socket);

    socket.on("message", (msg) => {
      if (msg === "RELOAD") sockets.forEach((s) => s.send(msg));
    });

    socket.on("close", () => {
      sockets = sockets.filter((s) => s !== socket);
    });
  });
};
