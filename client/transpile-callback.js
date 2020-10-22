const WebSocket = require("ws");

const socket = new WebSocket("ws://localhost:3031");
socket.onopen = () => {
  socket.send("RELOAD");
};
