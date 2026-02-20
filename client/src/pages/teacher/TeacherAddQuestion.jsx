import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExam } from "../../contexts/ExamContext";

const TeacherAddQuestion = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { addQuestionToExam } = useExam();

  const [type, setType] = useState("mcq");

  const [formData, setFormData] = useState({
    text: "",
    marks: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let questionData = {
      type,
      text: formData.text,
      marks: formData.marks,
    };

    if (type === "mcq") {
      questionData.options = [
        formData.optionA,
        formData.optionB,
        formData.optionC,
        formData.optionD,
      ];
      questionData.correctAnswer = formData.correctAnswer;
    }

    if (type === "truefalse") {
      questionData.options = ["True", "False"];
      questionData.correctAnswer = formData.correctAnswer;
    }

    if (type === "short" || type === "essay") {
      questionData.options = [];
      questionData.correctAnswer = null;
    }

    addQuestionToExam(examId, questionData);

    navigate(`/teacher/exams/${examId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add Question</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Question Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="mcq">Multiple Choice</option>
          <option value="truefalse">True / False</option>
          <option value="short">Short Answer</option>
          <option value="essay">Essay</option>
        </select>

        {/* Question Text */}
        <textarea
          name="text"
          placeholder="Question Text"
          value={formData.text}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Marks */}
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* MCQ Fields */}
        {type === "mcq" && (
          <>
            <input type="text" name="optionA" placeholder="Option A" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="optionB" placeholder="Option B" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="optionC" placeholder="Option C" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="optionD" placeholder="Option D" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="correctAnswer" placeholder="Correct Answer (A/B/C/D)" onChange={handleChange} required className="w-full border p-2 rounded" />
          </>
        )}

        {/* True/False */}
        {type === "truefalse" && (
          <select
            name="correctAnswer"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Correct Answer</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Question
        </button>

      </form>
    </div>
  );
};

export default TeacherAddQuestion;
