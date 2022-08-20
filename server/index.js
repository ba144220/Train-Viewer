import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
const __dirname = path.resolve();

import pinRoutes from "./routes/Pin.js";
import adminRoutes from "./routes/Admin.js";
import plotRoutes from "./routes/Plot.js";
import figureRoutes from "./routes/Figures.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to train viewer");
});
app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use("/pin", pinRoutes);
app.use("/admin", adminRoutes);
app.use("/plots", plotRoutes);
app.use("/figures", figureRoutes);
app.set("socket", io);

const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
        io.on("connection", (socket) => {
            console.log("new socket connected");
        });
    })
    .catch((error) => console.log(`${error} did not connect`));
