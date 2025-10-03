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

const addStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      department,
      college,
      place,
      sem,
      aptitudeMark,
    } = req.body;

    const studentExists = await Students.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const student = new Students({
      name,
      email,
      mobile,
      department,
      college,
      place,
      sem,
      aptitudeMark,
    });

    const savedStudent = await student.save();

    res.status(201).json({
      message: "✅ Student added successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error, could not add student" });
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

export { getAllStudents, addStudent, addFeedback, getFeedbacks };
