import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ExamContext = createContext();

export const useExam = () => useContext(ExamContext);

export const ExamProvider = ({ children }) => {

  /* ================= LOAD EXAMS ================= */
  const [exams, setExams] = useState(() => {
    const stored = localStorage.getItem("teacher_exams");
    return stored ? JSON.parse(stored) : [];
  });

  /* ================= LOAD SUBMISSIONS ================= */
  const [submissions, setSubmissions] = useState(() => {
    const stored = localStorage.getItem("student_submissions");
    return stored ? JSON.parse(stored) : [];
  });

  /* ================= PERSIST EXAMS ================= */
  useEffect(() => {
    localStorage.setItem("teacher_exams", JSON.stringify(exams));
  }, [exams]);

  /* ================= PERSIST SUBMISSIONS ================= */
  useEffect(() => {
    localStorage.setItem("student_submissions", JSON.stringify(submissions));
  }, [submissions]);

  /* ================= CREATE EXAM ================= */
  const createExam = (examData) => {
  const newExam = {
    id: uuidv4(),
    ...examData,
    totalMarks: 0,
    questions: [],
    status: "draft", // draft | scheduled | ongoing | finished
    publishDate: null,
    startTime: null,
    endTime: null,
    deadline: null,
    createdAt: new Date().toISOString(),
  };

  setExams((prev) => [...prev, newExam]);
};


  /* ================= DELETE EXAM ================= */
  const deleteExam = (id) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  /* ================= GET EXAM ================= */
  const getExamById = (id) => {
    return exams.find((exam) => exam.id === id);
  };

  /* ================= ADD QUESTION ================= */
  const addQuestionToExam = (examId, questionData) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id !== examId) return exam;
        if (exam.status !== "draft") return exam;

        const newQuestion = {
          id: uuidv4(),
          ...questionData,
        };

        const updatedQuestions = [...exam.questions, newQuestion];

        const updatedTotalMarks = updatedQuestions.reduce(
          (sum, q) => sum + Number(q.marks || 0),
          0
        );

        return {
          ...exam,
          questions: updatedQuestions,
          totalMarks: updatedTotalMarks,
        };
      })
    );
  };

  /* ================= DELETE QUESTION ================= */
  const deleteQuestion = (examId, questionId) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id !== examId) return exam;
        if (exam.status !== "draft") return exam;

        const updatedQuestions = exam.questions.filter(
          (q) => q.id !== questionId
        );

        const updatedTotalMarks = updatedQuestions.reduce(
          (sum, q) => sum + Number(q.marks || 0),
          0
        );

        return {
          ...exam,
          questions: updatedQuestions,
          totalMarks: updatedTotalMarks,
        };
      })
    );
  };

  /* ================= UPDATE QUESTION ================= */
  const updateQuestion = (examId, updatedQuestion) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id !== examId) return exam;
        if (exam.status !== "draft") return exam;

        const updatedQuestions = exam.questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        );

        const updatedTotalMarks = updatedQuestions.reduce(
          (sum, q) => sum + Number(q.marks || 0),
          0
        );

        return {
          ...exam,
          questions: updatedQuestions,
          totalMarks: updatedTotalMarks,
        };
      })
    );
  };

  /* ================= PUBLISH EXAM ================= */
  const publishExam = (examId) => {
  setExams((prev) =>
    prev.map((exam) => {
      if (exam.id !== examId) return exam;

      // 🚨 VALIDATION
      if (!exam.duration || Number(exam.duration) <= 0) {
        alert("Set exam duration before publishing");
        return exam;
      }

      if (exam.questions.length === 0) {
        alert("Add at least one question before publishing");
        return exam;
      }

      if (exam.totalMarks <= 0) {
        alert("Total marks must be greater than 0");
        return exam;
      }

      const now = new Date();
      const endTime = new Date(
        now.getTime() + Number(exam.duration) * 60000
      );

      return {
        ...exam,
        status: "scheduled",
        publishDate: now.toISOString(),
        startTime: now.toISOString(),
        endTime: endTime.toISOString(),
      };
    })
  );
};


  /* ================= CLOSE EXAM ================= */
  const closeExam = (examId) => {
  setExams((prev) =>
    prev.map((exam) =>
      exam.id === examId
        ? { ...exam, status: "finished" }
        : exam
    )
  );
};


  /* ================= SUBMIT EXAM (AUTO GRADING) ================= */
  const submitExam = (examId, studentId, answers) => {
    const exam = exams.find((e) => e.id === examId);
    if (!exam) return;

    let score = 0;

    exam.questions.forEach((q) => {
      const studentAnswer = answers[q.id];

      if (q.type === "mcq" || q.type === "truefalse") {
        if (studentAnswer === q.correctAnswer) {
          score += Number(q.marks || 0);
        }
      }
    });

    const newSubmission = {
      id: uuidv4(),
      examId,
      studentId,
      answers,
      score,
      totalMarks: exam.totalMarks,
      submittedAt: new Date().toISOString(),
    };

    setSubmissions((prev) => [...prev, newSubmission]);
  };

  /* ================= GET SUBMISSIONS ================= */
  const getSubmissionsByExam = (examId) => {
    return submissions.filter((s) => s.examId === examId);
  };

  const getStudentSubmission = (examId, studentId) => {
    return submissions.find(
      (s) => s.examId === examId && s.studentId === studentId
    );
  };

  /* ================= CONTEXT VALUE ================= */
  const value = {
    exams,
    submissions,
    createExam,
    deleteExam,
    getExamById,
    addQuestionToExam,
    deleteQuestion,
    updateQuestion,
    publishExam,
    closeExam,
    submitExam,
    getSubmissionsByExam,
    getStudentSubmission,
  };

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  );
};
