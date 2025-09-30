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
  aptitudeMark: {
    type: Number,
    required: true,
  },
});

const Students = mongoose.model("students", studentSchema);

export default Students;
