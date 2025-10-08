import Students from "../model/studentsModel.js";
import Feedback from "../model/feedbackModel.js";

const getAllStudents = async (req, res) => {
  try {
    const students = await Students.find({}).select(
      "name email mobile college place department sem aptitudeMark"
    );

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching students" });
  }
};

// 1️⃣ Start Test Controller
const startTest = async (req, res) => {
  try {
    const { name, email, mobile, department, college, place, sem } = req.body;

    // Check if already started
    const existingStudent = await Students.findOne({ email });

    if (existingStudent) {
      const now = new Date();
      if (existingStudent.endTime && now < existingStudent.endTime) {
        return res.status(200).json({
          message: "Test already started",
          student: existingStudent,
          endTime: existingStudent.endTime,
        });
      }
      return res
        .status(400)
        .json({ message: "Test already completed or time expired" });
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000); // 15 minutes

    const student = new Students({
      name,
      email,
      mobile,
      department,
      college,
      place,
      sem,
      startTime,
      endTime,
    });

    await student.save();

    res.status(201).json({
      message: "Test started successfully",
      endTime,
      student,
    });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Submit Test Controller
const addStudent = async (req, res) => {
  try {
    const { email, aptitudeMark } = req.body;

    const student = await Students.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.aptitudeMark = aptitudeMark;
    await student.save();

    res.status(200).json({
      message: "✅ Test submitted successfully",
      student,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addFeedback = async (req, res) => {
  try {
    const { userId, name, phone, email, college, place, feedback } = req.body;

    const newFeedback = new Feedback({
      userId,
      name,
      phone,
      email,
      college,
      place,
      testExperience: feedback.testExperience,
      computerKnowledge: feedback.computerKnowledge,
      usesAI: feedback.usesAI,
      aiTool: feedback.aiTool,
      wantMoreAI: feedback.wantMoreAI,
      interestedCourses: feedback.interestedCourses,
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      message: "✅ Feedback submitted successfully",
      feedback: savedFeedback,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Server error, could not save feedback" });
  }
};

export { getAllStudents, startTest, addStudent, addFeedback, getFeedbacks };
