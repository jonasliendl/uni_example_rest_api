import { Application } from "express";
import { initRoutes } from "./routes/router";
import { PrismaClient } from "@prisma/client";
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

const app: Application = express();
dotenv.config();

app.use(bodyParser.json());

const prismaClient = new PrismaClient();
prismaClient.$connect()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

initRoutes(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server is running on port 3000');
});

prismaClient.$disconnect()
    .then(() => console.log("Disconnected from database"))
    .catch((err) => console.log(err));
