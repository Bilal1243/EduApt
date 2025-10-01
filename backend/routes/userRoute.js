import express from "express";
import {
  getAllStudents,
  addFeedback,
  addStudent,
  getFeedbacks,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/", getAllStudents);

userRoute.post("/add-student", addStudent);

userRoute.get('/getFeedbacks',getFeedbacks)

userRoute.post("/feedback", addFeedback);

export default userRoute;
