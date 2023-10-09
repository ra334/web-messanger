require("dotenv").config();
import express, { Express, Request, Response } from "express";
import { Socket } from "socket.io";
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const errorMiddleware = require("./middlewares/error-middleware");

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3300;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use("/api", router);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send("express chil");
});

io.on('connection', (socket: any) => {
    console.log('a user connected')
})

app.listen(port, () => {
    console.log("app run");
});