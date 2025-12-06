import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);

// !initialized socket.io and attached to the http server
const io = socketIo(server);
app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
    console.log("User connection");

    // ! handle when user join the chat
    socket.on("join", (userName) => {
        users.add(userName);
        // ! broadcast all user that a new user has joined
        io.emit("userJoined", (user)=>{
            
        });

        // ! updated user list
        io.emit("userList", Array.from(users));
    });

    // ! handle user incoming chat message

    // ! handle user disconnection
});
