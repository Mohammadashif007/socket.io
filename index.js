import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello server");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// ! socket.io connection handlers
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    //! welcome the connected client
    socket.emit("welcome", { msg: "Welcome", id: socket.id });

    //! client -> server: basic message
    socket.on("message", (msg) => {
        console.log("Message from ", socket.id, msg);
        // ! broadcast to the everyone
        io.emit("message", { from: socket.id, text: msg });
    });

    // ! broadcast to everyone except sender
    socket.on("shout", (text) => {
        socket.broadcast.emit("shout", { from: socket.id, text });
    });

    // ! join/leave room
    socket.on("joinRoom", (room) => {
        socket.join(room);
        io.to(room).emit("system", `${socket.id} joined ${room}`);
    });
    socket.on("leaveRoom", (room) => {
        socket.leave(room);
        io.to(room).emit("system", `${socket.id} joined ${room}`);
    });

    // ! message to a room
    socket.on("roomMessage", ({ room, text }) => {
        io.to(room).emit("roomMessage", { from: socket.id, text });
    });

    // ! private message to socket id
    socket.on("privateMessage", ({ to, text }) => {
        io.to(to).emit("privateMessage", { from: socket.id, text });
    });

    // ! acknowledgement example
    socket.on("order", (data, callback) => {
        console.log("order", data);
        callback({ status: "received", id: Math.floor(Math.random() * 10000) });
    });

    // ! disconnect
    socket.on("disconnect", (reason) => {
        console.log("User disconnected: ", socket.id, reason);
        socket.broadcast.emit("userLeft", { id: socket.id });
    });
});

server.listen(port, () => {
    console.log(`Server is listening on server ${port}`);
});
