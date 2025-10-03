import React from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import {
  useGetStudentsQuery,
  useGetFeedbacksQuery,
} from "../slices/userApiSlice";
import Loader from "../components/Loader";

function StudentListScreen() {
  const { data: students , isLoading } = useGetStudentsQuery();
  const { data: feedbacks, isLoading : feedbackLoading } = useGetFeedbacksQuery();

  // Sort students by aptitudeMark (highest to lowest)
  const sortedStudents = students
    ? [...students].sort((a, b) => (b.aptitudeMark || 0) - (a.aptitudeMark || 0))
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
      Place : s.place,
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
      Place : f.place,
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
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Students List - {sortedStudents.length}</h1>

      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={handleDownloadStudentsExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Download Students
        </button>
        <button
          onClick={handleDownloadFeedbacksExcel}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Download Feedbacks
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">College</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Semester</th>
              <th className="py-2 px-4 border">Aptitude Mark</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student) => (
              <tr key={student._id} className="text-center">
                <td className="py-2 px-4 border">{student.name}</td>
                <td className="py-2 px-4 border">{student.email}</td>
                <td className="py-2 px-4 border">{student.mobile}</td>
                <td className="py-2 px-4 border">{student.college}</td>
                <td className="py-2 px-4 border">{student.department}</td>
                <td className="py-2 px-4 border">{student.sem}</td>
                <td className="py-2 px-4 border">{student.aptitudeMark || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentListScreen;
