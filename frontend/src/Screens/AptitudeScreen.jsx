import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFinalMark } from "../slices/userDetailsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddUserDataMutation } from "../slices/userApiSlice";

export const questions = [
  {
    id: 1,
    question:
      "Sentences of a paragraph are given below in jumbled order. Arrange them in the correct order to form a meaningful paragraph:\nA. Raja was a shoeshine boy. B. Raja was hard working and wanted to take care of his family. C. So, after school, he would sit near a cinema hall and polish shoes for a living. D. He lived with his mother and sister in a small jhuggi.",
    options: ["ADBC", "CBDA", "ABDC", "BACD"],
    correct: "ADBC",
  },
  {
    id: 2,
    question:
      "We live in a society that is not bound or connected to a religion or a religious body. This type of society is called:",
    options: ["orthodox", "rudimentary", "organic", "secular"],
    correct: "secular",
  },
  {
    id: 3,
    question: "Select the most appropriate synonym of the given word: Knave",
    options: ["Fraud", "Idealist", "Selfish", "Paragon"],
    correct: "Fraud",
  },
  {
    id: 4,
    question: "Select the most appropriate antonym of the word: Height",
    options: ["Length", "Stature", "Depth", "Figure"],
    correct: "Depth",
  },
  {
    id: 5,
    question:
      "Find the simplified value of [{(11 5/7 − 8 3/14)(5/8 − 19/56)} of 0.75].",
    options: ["0.2", "0.25", "0.5", "0.75"],
    correct: "0.75",
  },
  {
    id: 6,
    question:
      "The average age of a class of 20 students is 15 years. If the teacher’s age of 30 years is included, what is the new average age?",
    options: ["18.6 years", "15.7 years", "21 years", "30 years"],
    correct: "15.7 years",
  },
  {
    id: 7,
    question:
      "Ramesh sold a stock for ₹7200 at a 40% loss. At what price should he sell it to gain 25%?",
    options: ["₹12,800", "₹16,400", "₹13,800", "₹15,000"],
    correct: "₹15,000",
  },
  {
    id: 8,
    question:
      "A person bought 15 pumpkins at ₹20 each. Two were rotten, and the remaining 13 were sold at ₹25 each. Find the rate of profit or loss.",
    options: ["8.33% profit", "8.33% loss", "8.55% loss", "8.55% profit"],
    correct: "8.33% profit",
  },
  {
    id: 9,
    question:
      "In a drum, milk and water are in the ratio 7:9. If the quantity of milk is 63 litres, what is the quantity of water?",
    options: ["63 litres", "79 litres", "81 litres", "98 litres"],
    correct: "81 litres",
  },
  {
    id: 10,
    question:
      "4 women and 3 men can do a work in 20 days, while 2 women and 4 men can do it in 30 days. How long will 7 women and 9 men take to do the same work?",
    options: ["8 days", "12 days", "15 days", "10 days"],
    correct: "10 days",
  },
  {
    id: 11,
    question: "CFM, GLR, KRW, OXB, ?",
    options: ["SDG", "SDH", "TDG", "TEG"],
    correct: "SDG",
  },
  {
    id: 12,
    question:
      "The LCM and HCF of two numbers are 2970 and 30, respectively. What are the prime factors of their product?",
    options: ["2, 3, 5, 11", "2, 3, 7, 11", "2, 4, 5, 11", "2, 3, 7, 13"],
    correct: "2, 3, 5, 11",
  },
  {
    id: 13,
    question:
      "A person invested ₹25,800 for 1 2/5 years at 13 4/7 % rate of simple interest. What is the total amount received?",
    options: ["30,722", "30,720", "30,072", "30,702"],
    correct: "30,702",
  },
  {
    id: 14,
    question:
      "What is the result of the Excel formula: =IF(10>5, 'Pass', 'Fail')?",
    options: ["Pass", "Fail", "10>5", "Error"],
    correct: "Pass",
  },
  {
    id: 15,
    question:
      "What is the shortcut key used to access the Help feature in most MS Office applications?",
    options: ["Ctrl + H", "F1", "F5", "Alt + H"],
    correct: "F1",
  },
  {
    id: 16,
    question:
      "The ratio between the speeds of two trains is 3 : 5. If the second train runs 300 km in 4 hours, then the speed of the first train (in km/h) is:",
    options: ["35", "45", "55", "65"],
    correct: "45",
  },
  {
    id: 17,
    question:
      "What is the correct format specifier for printing a long double in C?",
    options: ["%lf", "%ld", "%Lf", "%f"],
    correct: "%Lf",
  },
  {
    id: 18,
    question:
      "In Java, what is the default value of an uninitialized instance variable of type boolean?",
    options: ["true", "false", "0", "It depends on the compiler"],
    correct: "false",
  },
  {
    id: 19,
    question: "What does the keyword 'super' refer to in Java?",
    options: [
      "The immediate subclass object",
      "The immediate superclass object",
      "The main class of the program",
      "A static method",
    ],
    correct: "The immediate superclass object",
  },
  {
    id: 20,
    question: "What is the size (in bits) of a char variable in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    correct: "16 bits",
  },
];

function AptitudeScreen() {
  const dispatch = useDispatch();
  const studentDetails = useSelector((state) => state.user.finalData);
  const [submitData, { isLoading }] = useAddUserDataMutation();

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const navigate = useNavigate();

  const shuffleArray = (arr) => {
    let shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));

    const endTime = localStorage.getItem("testEndTime");
    if (endTime) {
      const remaining = Math.floor((new Date(endTime) - new Date()) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });
    return score;
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.warning("You did not answer all questions. Submitting anyway...");
    }

    const score = calculateScore();

    try {
      setShowLoadingPopup(true);
      // 1️⃣ Update Redux state immediately
      dispatch(setFinalMark(score));

      // 2️⃣ Prepare updated student data
      const updatedStudent = { ...studentDetails, aptitudeMark: score };

      // 3️⃣ Update localStorage
      localStorage.setItem("finalData", JSON.stringify(updatedStudent));

      // 4️⃣ Submit to backend
      const res = await submitData(updatedStudent).unwrap();

      // 5️⃣ Optional: update localStorage with server response
      const studentData = res.student;
      localStorage.setItem("finalData", JSON.stringify(studentData));

      toast.success("Submitted successfully!");
      navigate("/feedback", { state: studentData });
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    } finally {
      setShowLoadingPopup(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!studentDetails) {
      navigate("/");
    }
  }, [studentDetails]);

  // 🚫 Anti-Cheat: Reset ONLY answers when tab is switched or minimized
  useEffect(() => {
    const resetAnswers = () => {
      // Clear only answers
      setAnswers({});
      window.location.reload();
    };

    // Detect tab switch
    const onVisibilityChange = () => {
      if (document.hidden) {
        resetAnswers();
      }
    };

    // Detect minimize or switching apps
    const onWindowBlur = () => {
      resetAnswers();
    };

    // Disable right-click (optional)
    const disableRightClick = (e) => e.preventDefault();
    window.addEventListener("contextmenu", disableRightClick);

    // Disable copy/paste/cut
    const blockCopyPaste = (e) => e.preventDefault();
    document.addEventListener("copy", blockCopyPaste);
    document.addEventListener("paste", blockCopyPaste);
    document.addEventListener("cut", blockCopyPaste);

    // Disable shortcuts and reset answers
    const disableShortcuts = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        resetAnswers();
      }
      if (e.key === "F12") {
        e.preventDefault();
        resetAnswers();
      }
    };
    window.addEventListener("keydown", disableShortcuts);

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("copy", blockCopyPaste);
      document.removeEventListener("paste", blockCopyPaste);
      document.removeEventListener("cut", blockCopyPaste);
      window.removeEventListener("keydown", disableShortcuts);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-50 flex flex-col items-center">
      <div className="w-full sticky top-0 z-50 bg-white shadow p-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Aptitude Exam</h1>
        <div className="text-lg sm:text-xl font-semibold text-red-600">
          ⏳ {formatTime(timeLeft)}
        </div>
      </div>

      <form
        className="w-full max-w-3xl grid gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {shuffledQuestions.map((q, index) => (
          <div key={q.id} className="bg-white p-4 rounded-lg shadow">
            <p className="font-medium mb-2">
              {index + 1}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    className="accent-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4 mb-14">
          <button
            type="submit"
            disabled={isLoading || timeLeft <= 0}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full sm:w-auto sm:order-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto sm:order-1 cursor-pointer"
          >
            Back
          </button>
        </div>
      </form>

      {/* ✅ Loading popup */}
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

export default AptitudeScreen;
