import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ExamProvider } from "./contexts/ExamContext";


// ================= AUTH =================
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// ================= STUDENT =================
import StudentPanel from './panels/StudentPanel';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import StudentCourses from './pages/StudentCourses';
import StudentAttendance from './pages/StudentAttendance';
import StudentAssignments from './pages/StudentAssignments';
import StudentResults from './pages/StudentResults';
import StudentSchedule from './pages/StudentSchedule';
import StudentExams from './pages/StudentExams';
import StudentFees from './pages/StudentFees';
import StudentLibrary from './pages/StudentLibrary';
import StudentComplaints from './pages/StudentComplaints';
import StudentExamAttempt from "./pages/StudentExamAttempt";



import LearningResources from './components/library/LearningResources';
import BorrowedBooks from './components/library/BorrowedBooks';
import PurchaseHistory from './components/library/PurchaseHistory';
import TransactionHistory from './components/finance/TransactionHistory';
import HomeworkSubmission from './components/assignments/HomeworkSubmission';
import Communications from './components/communications/Communications';

// ================= TEACHER =================
import TeacherPanel from './panels/TeacherPanel';
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherSubjects from './pages/teacher/TeacherSubjects';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherExamDetails from "./pages/teacher/TeacherExamDetails";
import TeacherAddQuestion from "./pages/teacher/TeacherAddQuestion";
import TeacherEditQuestion from "./pages/teacher/TeacherEditQuestion";
import TeacherExamsList from './pages/teacher/TeacherExamsList';
import TeacherCreateExam from "./pages/teacher/TeacherCreateExam";
import TeacherExamSubmissions from "./pages/teacher/TeacherExamSubmissions";
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherSessions from './pages/teacher/TeacherSessions';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAttendanceReports from './pages/teacher/TeacherAttendanceReport';
import TeacherViewResults from './pages/teacher/TeacherViewResults';
import TeacherEnterMarks from './pages/teacher/TeacherEnterMarks';
import TeacherResults from './pages/teacher/TeacherResults';
import AssignedComplaints from './pages/teacher/AssignedCompliants';
import Messages from './pages/teacher/Messages';
import CreateAssignment from './pages/teacher/CreateAssignment';


function App() {

  useEffect(() => {
    localStorage.setItem('studentToken', 'mock');
  }, []);

  return (
    <ExamProvider>
      <Router>
        <Routes>

          {/* ================= STUDENT ================= */}
          <Route path="/" element={<StudentPanel />}>
            <Route index element={<StudentDashboard />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="homework-submission" element={<HomeworkSubmission />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="exams" element={<StudentExams />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="library" element={<StudentLibrary />} />
            <Route path="resources" element={<LearningResources />} />
            <Route path="borrowed" element={<BorrowedBooks />} />
            <Route path="purchase" element={<PurchaseHistory />} />
            <Route path="transactions" element={<TransactionHistory />} />
            <Route path="complaints" element={<StudentComplaints />} />
            <Route path="communications" element={<Communications />} />
            <Route path="exams/:examId/attempt" element={<StudentExamAttempt />} />
          </Route>

          {/* ================= TEACHER ================= */}
          <Route path="/teacher/*" element={<TeacherPanel />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="subjects" element={<TeacherSubjects />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path='students' element={<TeacherStudents />} />
            <Route path='assignments' element={<TeacherAssignments />} />
            <Route path='sessions' element={<TeacherSessions />} />
            <Route path='attendance' element={<TeacherAttendance />} />
            <Route path='attendance-reports' element={<TeacherAttendanceReports />} />
            <Route path='create-assignments' element={<CreateAssignment />} />
            

            <Route path="exams">
              <Route index element={<TeacherExamsList />} />
              <Route path=":examId" element={<TeacherExamDetails />} />
              <Route path=":examId/add-question" element={<TeacherAddQuestion />} />
              <Route
                path=":examId/edit-question/:questionId"
                element={<TeacherEditQuestion />}
              />
              <Route path="create" element={<TeacherCreateExam />} />
              <Route
  path=":examId/submissions"
  element={<TeacherExamSubmissions />}
/>

            </Route>
            <Route path="results">
  <Route index element={<TeacherResults />} />
  <Route path="enter-marks" element={<TeacherEnterMarks />} />
  <Route path="view-results" element={<TeacherViewResults />} />
</Route>
          <Route path="complaints" element={<AssignedComplaints />} />
          <Route path="messages" element={<Messages />} />

          </Route>

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </ExamProvider>
  );
}

export default App;
