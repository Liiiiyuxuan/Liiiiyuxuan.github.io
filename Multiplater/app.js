const { Socket } = require("dgram");
const ws = require("ws");

const wss = new ws.Server({port: 8080});

wss.on("connection", (socket) => {
    Socket.on
})