import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// !initialized socket.io and attached to the http server
const io = new Server(server);
app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
    console.log("A new user connected");
    socket.on("join", (userName) => {
        users.add(userName);

        // ! broadcast to all user that a new user has joined
        socket.emit("userJoined", userName);

        // ! send the updated user lint to all client
        socket.emit("userList", Array.from(users));
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
