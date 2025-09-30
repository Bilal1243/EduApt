import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors'
import userRoute from "./routes/userRoute.js";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/user' , userRoute)

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
