import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExam } from "../contexts/ExamContext";

const StudentExamAttempt = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { getExamById, submitExam, getStudentSubmission } = useExam();

  const studentId = "student_001"; // موقتی

  const exam = getExamById(examId);

  const existingSubmission = getStudentSubmission(examId, studentId);

  const [answers, setAnswers] = useState({});

  if (!exam || exam.status !== "published") {
    return <div className="p-6">Exam not available</div>;
  }

  if (existingSubmission) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Result</h2>
        <p>
          Score: {existingSubmission.score} /{" "}
          {existingSubmission.totalMarks}
        </p>
      </div>
    );
  }

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    submitExam(examId, studentId, answers);
    navigate(0);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{exam.title}</h1>

      {exam.questions.map((q, index) => (
        <div key={q.id} className="border p-4 rounded space-y-2">
          <p>
            {index + 1}. {q.text}
          </p>

          {q.type === "mcq" &&
            q.options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  onChange={() => handleChange(q.id, opt)}
                />{" "}
                {opt}
              </label>
            ))}

          {q.type === "truefalse" && (
            <>
              <label className="block">
                <input
                  type="radio"
                  name={q.id}
                  value="true"
                  onChange={() => handleChange(q.id, "true")}
                />{" "}
                True
              </label>
              <label className="block">
                <input
                  type="radio"
                  name={q.id}
                  value="false"
                  onChange={() => handleChange(q.id, "false")}
                />{" "}
                False
              </label>
            </>
          )}

          {q.type === "short" && (
            <input
              type="text"
              className="border p-2 w-full"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "essay" && (
            <textarea
              className="border p-2 w-full"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Exam
      </button>
    </div>
  );
};

export default StudentExamAttempt;
