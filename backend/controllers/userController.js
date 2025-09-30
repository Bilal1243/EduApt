import fs from "fs";               // import fs
import path from "path";           // for safe file paths
import XLSX from "xlsx";

// Make sure filePath is defined
const filePath = path.resolve("student submissions.xlsx");
const feedbackPath = path.resolve("student feedbacks.xlsx");


const submitData = async (req, res) => {
  try {
    const formData = req.body;

    let workbook;
    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);
    } else {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = "student submissions";
    let worksheet = workbook.Sheets[sheetName];

    let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
    data.push(formData);

    worksheet = XLSX.utils.json_to_sheet(data);

    // remove old sheet if it exists
    if (workbook.Sheets[sheetName]) {
      delete workbook.Sheets[sheetName];
      workbook.SheetNames = workbook.SheetNames.filter((s) => s !== sheetName);
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, filePath);

    res.json({ message: "✅ Form data saved to Excel!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


const submitFeedback = async (req, res) => {
  try {
    const feedbackData = req.body; 

    let workbook;
    if (fs.existsSync(feedbackPath)) {
      workbook = XLSX.readFile(feedbackPath);
    } else {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = "student feedbacks";
    let worksheet = workbook.Sheets[sheetName];

    let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
    data.push(feedbackData);

    worksheet = XLSX.utils.json_to_sheet(data);

    // remove old sheet if exists
    if (workbook.Sheets[sheetName]) {
      delete workbook.Sheets[sheetName];
      workbook.SheetNames = workbook.SheetNames.filter((s) => s !== sheetName);
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, feedbackPath);

    res.json({ message: "✅ Feedback saved to Excel!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export { submitData,submitFeedback };
