import { Application } from "express";
import { initRoutes } from "./routes/router";
import { PrismaClient } from "@prisma/client";

const express = require('express');
const app: Application = express();

const prismaClient = new PrismaClient();
prismaClient.$connect()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

initRoutes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

prismaClient.$disconnect()
    .then(() => console.log("Disconnected from database"))
    .catch((err) => console.log(err));
