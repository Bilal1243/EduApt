import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  aptitudeMark: {
    type: Number,
    default : 0
  },
});

const Students = mongoose.model("students", studentSchema);

export default Students;
