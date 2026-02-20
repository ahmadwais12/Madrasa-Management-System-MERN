import React from "react";
import { useParams } from "react-router-dom";
import { useExam } from "../../contexts/ExamContext";
import Card from "../../components/UIHelper/Card";
import Badge from "../../components/UIHelper/Badge";

const TeacherExamSubmissions = () => {
  const { examId } = useParams();
  const { getExamById, getSubmissionsByExam } = useExam();

  const exam = getExamById(examId);
  const submissions = getSubmissionsByExam(examId);

  if (!exam) {
    return <div className="p-6">Exam not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Submissions — {exam.title}
        </h1>
        <p className="text-gray-600">
          Total Submissions: {submissions.length}
        </p>
      </div>

      {submissions.length === 0 && (
        <p className="text-gray-500">
          No student has submitted this exam yet.
        </p>
      )}

      {submissions.map((submission) => (
        <Card key={submission.id} className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">
                Student ID: {submission.studentId}
              </p>
              <p className="text-sm text-gray-600">
                Submitted At:{" "}
                {new Date(
                  submission.submittedAt
                ).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <Badge variant="success">
                {submission.score} / {submission.totalMarks}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TeacherExamSubmissions;
