import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "students", // optional: reference to Students collection
    },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    college: { type: String, required: true, trim: true },

    // From your frontend state
    testExperience: { type: String, default: "" },
    computerKnowledge: { type: String, default: "" },
    usesAI: { type: String, default: "" }, // could be Yes/No
    aiTool: { type: String, default: "" },
    wantMoreAI: { type: String, default: "" },
    interestedCourses: { type: String, default: "" },

    feedback: { type: String, default: "" }, // general comments if any
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
