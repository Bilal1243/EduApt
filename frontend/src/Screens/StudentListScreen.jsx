import React from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import {
  useGetStudentsQuery,
  useGetFeedbacksQuery,
} from "../slices/userApiSlice";
import Loader from "../components/Loader";

function StudentListScreen() {
  const { data: students, isLoading } = useGetStudentsQuery();
  const { data: feedbacks, isLoading: feedbackLoading } =
    useGetFeedbacksQuery();

  // Sort students by aptitudeMark (highest to lowest)
  const sortedStudents = students
    ? [...students].sort(
        (a, b) => (b.aptitudeMark || 0) - (a.aptitudeMark || 0)
      )
    : [];

  // Export students to Excel
  const handleDownloadStudentsExcel = () => {
    if (!sortedStudents || sortedStudents.length === 0)
      return toast.error("No student data to download");

    const excelData = sortedStudents.map((s) => ({
      Name: s.name,
      Email: s.email,
      Mobile: s.mobile,
      College: s.college,
      Place: s.place,
      Department: s.department,
      Semester: s.sem,
      "Aptitude Mark": s.aptitudeMark || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
    toast.success("✅ Students Excel file downloaded!");
  };

  // Export feedbacks to Excel
  const handleDownloadFeedbacksExcel = () => {
    if (!feedbacks || feedbacks.length === 0)
      return toast.error("No feedback data to download");

    const excelData = feedbacks.map((f) => ({
      Name: f.name,
      Phone: f.phone,
      Email: f.email,
      College: f.college,
      Place: f.place,
      "Test Experience": f.testExperience,
      "Computer Knowledge": f.computerKnowledge,
      "Uses AI": f.usesAI,
      "AI Tool": f.aiTool || "",
      "Want More AI": f.wantMoreAI,
      "Interested Courses": f.interestedCourses,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedbacks");
    XLSX.writeFile(workbook, "feedbacks.xlsx");
    toast.success("✅ Feedbacks Excel file downloaded!");
  };

  if (isLoading || feedbackLoading) return <Loader />;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          👩‍🎓 Students List{" "}
          <span className="text-blue-600">({sortedStudents.length})</span>
        </h1>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={handleDownloadStudentsExcel}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition"
          >
            ⬇️ Students
          </button>
          <button
            onClick={handleDownloadFeedbacksExcel}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 active:scale-95 transition"
          >
            ⬇️ Feedbacks
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-left">
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Mobile</th>
              <th className="py-3 px-4 font-semibold">College</th>
              <th className="py-3 px-4 font-semibold">Department</th>
              <th className="py-3 px-4 font-semibold">Semester</th>
              <th className="py-3 px-4 font-semibold text-center">
                Aptitude Mark
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr
                key={student._id}
                className={`border-t hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.mobile}</td>
                <td className="py-3 px-4">{student.college}</td>
                <td className="py-3 px-4">{student.department}</td>
                <td className="py-3 px-4">{student.sem}</td>
                <td className="py-3 px-4 text-center font-semibold text-blue-600">
                  {student.aptitudeMark || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentListScreen;
