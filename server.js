import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const port = 7000;

const server = http.createServer(app);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
});

server.listen(port, () => {
    console.log(`App is running on ${port}`);
});
