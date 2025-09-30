import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFinalMark, clearUserData } from "../slices/userDetailsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddUserDataMutation } from "../slices/userApiSlice";

export const questions = [
  {
    id: 1,
    question: "Sentences of a paragraph are given below in jumbled order. Arrange them in the correct order to form a meaningful paragraph: A. Raja was a shoeshine boy. B. Raja was hard working and wanted to take care of his family. C. So, after school, he would sit near a cinema hall and polish shoes for a living. D. He lived with his mother and sister in a small jhuggi.",
    options: ["ADBC", "CBDA", "ABDC", "BACD"],
    correct: "ADBC",
  },
  {
    id: 2,
    question: "We live in a society that is not bound or connected to a religion or a religious body. This type of society is called:",
    options: ["orthodox", "rudimentary", "organic", "secular"],
    correct: "secular",
  },
  {
    id: 3,
    question: "She was head and shoulders above the others in her dance performance. The phrase 'head and shoulders above' means:",
    options: ["much taller than", "far superior to", "quite odd from", "very jealous of"],
    correct: "far superior to",
  },
  {
    id: 4,
    question: "Select the most appropriate synonym of the given word: Knave",
    options: ["Fraud", "Idealist", "Selfish", "Paragon"],
    correct: "Fraud",
  },
  {
    id: 5,
    question: "Select the most appropriate antonym of the word: Height",
    options: ["Length", "Stature", "Depth", "Figure"],
    correct: "Depth",
  },
  {
    id: 6,
    question: "Find the simplified value of [{(11 5/7 − 8 3/14)(5/8 − 19/56)} of 0.75].",
    options: ["0.2", "0.25", "0.5", "0.75"],
    correct: "0.75",
  },
  {
    id: 7,
    question: "The average age of a class of 20 students is 15 years. If the teacher’s age of 30 years is included, what is the new average age?",
    options: ["18.6 years", "15.7 years", "21 years", "30 years"],
    correct: "15.7 years",
  },
  {
    id: 8,
    question: "Ramesh sold a stock for ₹7200 at a 40% loss. At what price should he sell it to gain 25%?",
    options: ["₹12,800", "₹16,400", "₹13,800", "₹15,000"],
    correct: "₹15,000",
  },
  {
    id: 9,
    question: "A person bought 15 pumpkins at ₹20 each. Two were rotten, and the remaining 13 were sold at ₹25 each. Find the rate of profit or loss.",
    options: ["831% profit", "831% loss", "452% loss", "452% profit"],
    correct: "831% profit",
  },
  {
    id: 10,
    question: "In a drum, milk and water are in the ratio 7:9. If the quantity of milk is 63 litres, what is the quantity of water?",
    options: ["63 litres", "79 litres", "81 litres", "98 litres"],
    correct: "81 litres",
  },
  {
    id: 11,
    question: "A person invested ₹25,800 for 152 years at a simple interest rate of 1374%. What is the total amount received?",
    options: ["₹28,000", "₹29,500", "₹30,000", "₹30,702"],
    correct: "₹30,702",
  },
  {
    id: 12,
    question: "The ratio of compound interest for 2 years to simple interest for 1 year at a certain rate r% is 2.21. Find r.",
    options: ["21", "11", "20", "10"],
    correct: "21",
  },
  {
    id: 13,
    question: "4 women and 3 men can do a work in 20 days, while 2 women and 4 men can do it in 30 days. How long will 7 women and 9 men take to do the same work?",
    options: ["8 days", "12 days", "15 days", "10 days"],
    correct: "10 days",
  },
  {
    id: 14,
    question: "In a hospital, seven patients P, Q, R, S, T, U and V are in rooms 7, 8 and 9. Each room has at least two patients. P is a child and is not in room 9. T is an adult and is in room 7 with only one other patient. V is a child and is with P. Q is a child and is not in the same room as R. S is an adult and is in room 8. R is in room 9. U is a child. How many children are there?",
    options: ["4", "3", "3 or 4", "Data inadequate"],
    correct: "4",
  },
  {
    id: 15,
    question: "CFM, GLR, KRW, OXB, ?",
    options: ["SDG", "SDH", "TDG", "TEG"],
    correct: "SDH",
  },
  {
    id: 16,
    question: "140 : 25 :: 964 : ?",
    options: ["361", "72", "255", "124"],
    correct: "361",
  },
  {
    id: 17,
    question: "There are two blue toys, three green toys, and four red toys. In how many ways can you select 3 toys with at least one blue and one green toy?",
    options: ["36", "38", "33", "40"],
    correct: "33",
  },
  {
    id: 18,
    question: "The LCM and HCF of two numbers are 2970 and 30, respectively. What are the prime factors of their product?",
    options: ["2, 3, 5, 11", "2, 3, 7, 11", "2, 4, 5, 11", "2, 3, 7, 13"],
    correct: "2, 3, 5, 11",
  },
  {
    id: 19,
    question: "From a deck of 52 cards, 4 cards are drawn such that one is a spade and one is a heart. In how many ways can this be done?",
    options: ["(113)×(113)×(226)", "(452)", "26×(250)", "(413)"],
    correct: "(113)×(113)×(226)",
  },
  {
    id: 20,
    question: "Which number should be multiplied by 43 so that the product has exactly three distinct prime factors?",
    options: ["2", "3", "6", "8"],
    correct: "6",
  },
];


function AptitudeScreen() {
  const dispatch = useDispatch();
  const studentDetails = useSelector((state) => state.user.finalData);

  const [submitData] = useAddUserDataMutation()

  const [answers, setAnswers] = useState({}); 

  const navigate =useNavigate()

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
      return toast.error("Please answer all questions");
    }

    const score = calculateScore();

    // Update Redux + localStorage
    dispatch(setFinalMark(score));
    localStorage.setItem(
      "finalData",
      JSON.stringify({ ...studentDetails, aptitudeMark: score })
    );

    toast.success(
      `✅ Final mark saved! Your score: ${score}/${questions.length}`
    );

    try {
      const res = await submitData({ ...studentDetails, aptitudeMark: score }).unwrap()
      toast.success("Submitted successfully!");
    //   dispatch(clearUserData());
      navigate('/feedback')
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Try again.");
    }
  };
 
  return (
    <div className="min-h-screen p-4 bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Aptitude Exam</h1>
      <div className="w-full max-w-3xl grid gap-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-4 rounded-lg shadow">
            <p className="font-medium mb-2">
              {q.id}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={()=>navigate(-1)}
          >
            back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Submit Final
          </button>
        </div>
      </div>
    </div>
  );
}

export default AptitudeScreen;
