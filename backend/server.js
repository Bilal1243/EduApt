import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

let port = process.env.PORT || 3000;

app.listen(port, () => console.log("server started successfully"));
