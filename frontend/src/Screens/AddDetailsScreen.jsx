import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setStudentDetails, setTestEndTime } from "../slices/userDetailsSlice";
import { useStartTestMutation } from "../slices/userApiSlice";

function AddDetailsScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentDetails = useSelector((state) => state.user.finalData);

  const [startTest, { isLoading }] = useStartTestMutation();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    department: "",
    college: "",
    place: "",
    sem: "",
  });
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  useEffect(() => {
    if (studentDetails && Object.keys(studentDetails).length > 0) {
      setFormData({
        name: studentDetails.name || "",
        mobile: studentDetails.mobile || "",
        email: studentDetails.email || "",
        department: studentDetails.department || "",
        college: studentDetails.college || "",
        place: studentDetails.place || "",
        sem: studentDetails.sem || "",
      });
    }
  }, [studentDetails]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, mobile, email, department, college, place, sem } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (!department.trim()) {
      toast.error("Department is required");
      return false;
    }
    if (!college.trim()) {
      toast.error("College is required");
      return false;
    }
    if (!place.trim()) {
      toast.error("Place is required");
      return false;
    }
    if (!sem || sem < 1 || sem > 8) {
      toast.error("Enter a valid semester");
      return false;
    }

    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setShowLoadingPopup(true);

      // Call backend to register/start test
      const res = await startTest({ ...formData }).unwrap();
      const studentData = res.student;

      // Save in Redux + localStorage
      dispatch(setStudentDetails(studentData));

      // Set test end time (15 minutes from now)
      const endTime = new Date(res.endTime).toISOString();

      dispatch(setTestEndTime(endTime));

      setShowLoadingPopup(false);

      toast.success(res.message);

      navigate("/aptitude");
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student Details Form
        </h2>

        <form
          onSubmit={handleNext}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={
                  key === "email"
                    ? "email"
                    : key === "mobile"
                    ? "tel"
                    : key === "sem"
                    ? "number"
                    : "text"
                }
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter your ${key}`}
                min={key === "sem" ? 1 : undefined}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {showLoadingPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-700">
              Submitting your answers...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDetailsScreen;
