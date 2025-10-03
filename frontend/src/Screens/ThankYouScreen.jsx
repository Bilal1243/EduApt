import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../slices/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

function ThankYouScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.user.finalData) || {};

  const handleFinish = () => {
    dispatch(clearUserData());
    window.location.href = "https://edure.in/"; // redirect to your site
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 rounded-full p-4 animate-bounce">
            <CheckCircle2 size={52} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
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
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 py-4 px-8 rounded-xl inline-block mb-8 shadow-inner border border-blue-200">
          <p className="text-lg">
            Your Aptitude Score:{" "}
            <span className="font-bold text-2xl">
              {studentDetails.aptitudeMark ?? "N/A"}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <a
            href="https://chat.whatsapp.com/IBie81D3DZQ1VsiDjiYXMX?mode=ems_copy_t"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 active:scale-95 transition-transform duration-200"
          >
            <FaWhatsapp size={22} /> Join WhatsApp
          </a>

          <a
            href="https://learn.edure.in/courses/Prompt-Engineering-Concept-Mastery-656b3029e4b08c4823beda36"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-transform duration-200"
          >
            <SiGoogleclassroom size={22} /> Get Free Class
          </a>
        </div>

        {/* Finish Button */}
        <button
          onClick={handleFinish}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 active:scale-95 transition-transform duration-200"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default ThankYouScreen;
