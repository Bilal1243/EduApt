import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../slices/userDetailsSlice";
import { useNavigate } from "react-router-dom";

function ThankYouScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.user.finalData) || {};

  const handleFinish = () => {
    dispatch(clearUserData());
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-4">
        {studentDetails.name
          ? `Dear ${studentDetails.name},`
          : "Dear Student,"}{" "}
        your feedback has been submitted successfully.
      </p>
      <p className="text-lg mb-4">
        Your aptitude score:{" "}
        <span className="font-semibold">
          {studentDetails.aptitudeMark ?? "N/A"}
        </span>
      </p>
      <button
        onClick={handleFinish}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Finish
      </button>
    </div>
  );
}

export default ThankYouScreen;
