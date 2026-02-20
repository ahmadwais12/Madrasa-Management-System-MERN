import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExam } from "../../contexts/ExamContext";

const TeacherEditQuestion = () => {
  const { examId, questionId } = useParams();
  const navigate = useNavigate();
  const { getExamById, updateQuestion } = useExam();

  const exam = getExamById(examId);
  const question = exam.questions.find(q => q.id === questionId);

  const [formData, setFormData] = useState(question);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQuestion = {
      ...formData,
      id: questionId, // مهم
    };

    updateQuestion(examId, updatedQuestion);
    navigate(`/teacher/exams/${examId}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Question</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>

      </form>
    </div>
  );
};

export default TeacherEditQuestion;
