import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExam } from "../../contexts/ExamContext";

const TeacherExamDetails = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const {
    getExamById,
    publishExam,
    closeExam,
    deleteQuestion,
  } = useExam();

  const exam = getExamById(examId);

  if (!exam) {
    return (
      <div className="p-6 text-red-500">
        Exam not found.
      </div>
    );
  }

  const handleDelete = (questionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) return;

    deleteQuestion(exam.id, questionId);
  };

  const renderQuestion = (q, index) => {
    return (
      <div
        key={q.id}
        className="border rounded p-4 bg-gray-50 space-y-2"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">
              {index + 1}. {q.text}
            </p>
            <span className="text-sm text-gray-600">
              {q.marks} marks
            </span>
          </div>

          {/* Edit & Delete فقط در Draft */}
          {exam.status === "draft" && (
            <div className="flex gap-3 text-sm">
              <button
                onClick={() =>
                  navigate(
                    `/teacher/exams/${exam.id}/edit-question/${q.id}`
                  )
                }
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(q.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* MCQ */}
        {q.type === "mcq" && (
          <>
            <ul className="ml-5 list-disc text-sm">
              {q.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <p className="text-green-600 text-sm">
              Correct: {q.correctAnswer}
            </p>
          </>
        )}

        {/* True/False */}
        {q.type === "truefalse" && (
          <p className="text-green-600 text-sm">
            Correct: {q.correctAnswer}
          </p>
        )}

        {/* Short Answer */}
        {q.type === "short" && (
          <p className="text-gray-500 text-sm italic">
            Short answer question
          </p>
        )}

        {/* Essay */}
        {q.type === "essay" && (
          <p className="text-gray-500 text-sm italic">
            Essay / Descriptive question
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
<div className="flex justify-between items-center flex-wrap gap-3">
  <div>
    <h1 className="text-2xl font-bold">{exam.title}</h1>
    <p className="text-gray-500">
      {exam.subject} | Class: {exam.className}
    </p>
  </div>

  <div className="flex gap-2 flex-wrap">

    {/* Add Question */}
    {exam.status === "draft" && (
      <button
        onClick={() =>
          navigate(`/teacher/exams/${exam.id}/add-question`)
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>
    )}

    {/* Publish */}
    {exam.status === "draft" && (
      <button
        onClick={() => publishExam(exam.id)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Publish
      </button>
    )}

    {/* Close */}
    {exam.status === "published" && (
      <button
        onClick={() => closeExam(exam.id)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    )}

    {/* ✅ View Submissions */}
    {(exam.status === "published" || exam.status === "closed") && (
      <button
        onClick={() =>
          navigate(`/teacher/exams/${exam.id}/submissions`)
        }
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        View Submissions
      </button>
    )}

  </div>
</div>


      {/* Exam Info */}
      <div className="bg-white shadow rounded p-4 space-y-2">
        <p><strong>Duration:</strong> {exam.duration} minutes</p>
        <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
        <p><strong>Status:</strong> {exam.status}</p>
        <p><strong>Questions:</strong> {exam.questions.length}</p>
      </div>

      {/* Questions */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">
          Questions
        </h2>

        {exam.questions.length === 0 ? (
          <p className="text-gray-500">
            No questions added yet.
          </p>
        ) : (
          <div className="space-y-4">
            {exam.questions.map((q, index) =>
              renderQuestion(q, index)
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default TeacherExamDetails;
