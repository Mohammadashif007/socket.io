import express from "express";
import { Server } from "socket.io";

const app = express();
const port = 7000;

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});
