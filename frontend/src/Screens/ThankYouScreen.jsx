import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../slices/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react"; // nice icon from lucide-react

function ThankYouScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.user.finalData) || {};

  const handleFinish = () => {
    dispatch(clearUserData());

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 rounded-full p-4 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Thank You!
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {studentDetails.name
            ? `Dear ${studentDetails.name},`
            : "Dear Student,"}{" "}
          your feedback has been submitted successfully.
        </p>

        {/* Score */}
        <div className="bg-blue-50 text-blue-700 py-3 px-6 rounded-lg inline-block mb-8 shadow-inner">
          <p className="text-lg">
            Your Aptitude Score:{" "}
            <span className="font-bold text-2xl">
              {studentDetails.aptitudeMark ?? "N/A"}
            </span>
          </p>
        </div>

        {/* Finish Button */}
        <button
          onClick={handleFinish}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md"
          
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default ThankYouScreen;
