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

server.listen(port, () => {
    console.log(`Server is listening on server ${port}`);
});
