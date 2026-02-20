import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../contexts/ExamContext";

const TeacherCreateExam = () => {
  const navigate = useNavigate();
  const { createExam } = useExam();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    className: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createExam(formData);
    navigate("/teacher/exams");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Exam Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="className"
          placeholder="Class"
          value={formData.className}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default TeacherCreateExam;
