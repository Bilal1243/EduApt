import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback, setStudentDetails } from "../slices/userDetailsSlice";
import { toast } from "react-toastify";
import { useSubmitFeedbackMutation } from "../slices/userApiSlice";
import { useNavigate, useLocation } from "react-router-dom";

function FeedbackScreen() {
  const dispatch = useDispatch();
  const studentDetails = useSelector((state) => state.user.finalData);

  const [feedback, setLocalFeedback] = useState({
    testExperience: "",
    computerKnowledge: "",
    usesAI: "",
    aiTool: "",
    wantMoreAI: "",
    interestedCourses: "",
  });

  const [submitFeedback] = useSubmitFeedbackMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLocalFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!studentDetails._id) {
      // maybe fetch from localStorage again or redirect
      const data = JSON.parse(localStorage.getItem("finalData"));
      if (data?._id) {
        dispatch(setStudentDetails(data));
      }
    }
  }, [studentDetails]);

  const handleSubmit = async () => {
    if (
      !feedback.testExperience ||
      !feedback.computerKnowledge ||
      !feedback.usesAI ||
      (feedback.usesAI === "Yes" && !feedback.aiTool) ||
      !feedback.wantMoreAI ||
      !feedback.interestedCourses
    ) {
      return toast.error("Please fill all required fields!");
    }

    const updatedData = { ...studentDetails, feedback };

    // ✅ Update Redux state
    dispatch(setFeedback(updatedData));
    localStorage.setItem("finalData", JSON.stringify(updatedData));

    try {
      await submitFeedback({
        userId: studentDetails._id,
        name: studentDetails.name,
        phone: studentDetails.mobile,
        email: studentDetails.email,
        college: studentDetails.college,
        feedback,
      }).unwrap();

      toast.success("✅ Feedback saved successfully!");
      navigate("/thankyou");
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Feedback Form</h1>
      <div className="grid gap-4 w-full max-w-xl">
        {/* How was the test */}
        <label className="font-medium">How was the test?</label>
        <select
          name="testExperience"
          value={feedback.testExperience}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>

        {/* Knowledge in Computer */}
        <label className="font-medium">
          How is your knowledge in computer?
        </label>
        <select
          name="computerKnowledge"
          value={feedback.computerKnowledge}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Do you use AI */}
        <label className="font-medium">Do you use AI?</label>
        <select
          name="usesAI"
          value={feedback.usesAI}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Which AI */}
        {feedback.usesAI === "Yes" && (
          <>
            <label className="font-medium">Which AI are you using?</label>
            <input
              type="text"
              name="aiTool"
              value={feedback.aiTool}
              onChange={handleChange}
              placeholder="Eg: ChatGPT, Gemini, Copilot..."
              className="border p-2 rounded-lg"
            />
          </>
        )}

        {/* Want to know more about AI */}
        <label className="font-medium">
          Do you want to know more about AI?
        </label>
        <select
          name="wantMoreAI"
          value={feedback.wantMoreAI}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>

        {/* Interested Courses */}
        <label className="font-medium">
          Which other courses are you interested in?
        </label>
        <input
          type="text"
          name="interestedCourses"
          value={feedback.interestedCourses}
          onChange={handleChange}
          placeholder="Eg: MERN, Data Science, AI, Cybersecurity..."
          className="border p-2 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default FeedbackScreen;
