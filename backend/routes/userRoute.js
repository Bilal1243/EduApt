import express from "express";
import {
  getAllStudents,
  addFeedback,
  addStudent,
  getFeedbacks,
  startTest,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/", getAllStudents);

userRoute.post("/start-test", startTest);

userRoute.post("/submit-test", addStudent);

userRoute.get("/getFeedbacks", getFeedbacks);

userRoute.post("/feedback", addFeedback);

export default userRoute;
