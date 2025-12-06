import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);

// !initialized socket.io and attached to the http server
const io = socketIo(server);
app.use(express.static("public"));

const user = new Set();

io.on("connection", (socket) => {
    console.log("User connection");

    // ! handle when user join the chat
    

    // ! handle user incoming chat message

    // ! handle user disconnection
});
