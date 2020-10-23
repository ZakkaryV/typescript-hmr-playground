const WebSocket = require("ws");

const socket = new WebSocket("ws://localhost:3030");
socket.onopen = () => {
  socket.send("RELOAD");
};

socket.onerror = (err) => {
  console.error("Could not connect to HMR WebSocket server.");
};
