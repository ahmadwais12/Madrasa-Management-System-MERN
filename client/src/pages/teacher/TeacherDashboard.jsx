import React, { useState } from 'react';
import { BarChartComponent, LineChartComponent } from '../../components/UIHelper/Chart';
import Card from '../../components/UIHelper/Card';
import Avatar from '../../components/UIHelper/Avatar';
import { formatDate } from '../../lib/utils';

const TeacherDashboard = () => {

  const [quickStats] = useState({
    coursesTeaching: 4,
    totalStudents: 120,
    assignmentsToReview: 8,
    todayClasses: 3
  });

  const classAttendanceData = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 88 },
    { month: 'Mar', rate: 94 },
    { month: 'Apr', rate: 90 },
    { month: 'May', rate: 93 }
  ];

  const classPerformanceData = [
    { subject: 'Math', score: 78 },
    { subject: 'Physics', score: 74 },
    { subject: 'Arabic', score: 85 },
    { subject: 'Islamic Studies', score: 88 }
  ];

  const recentActivity = [
    { id:1, title:'Assignment Submitted', student:'Ali Ahmad', course:'Math', date:'2024-02-10'},
    { id:2, title:'Attendance Marked', course:'Physics', date:'2024-02-09'},
    { id:3, title:'New Exam Created', course:'Arabic', date:'2024-02-08'}
  ];

  const upcomingClasses = [
    { id:1, title:'Math Class', date:'2024-02-15', time:'09:00 AM'},
    { id:2, title:'Physics Lecture', date:'2024-02-15', time:'11:00 AM'},
    { id:3, title:'Islamic Studies', date:'2024-02-16', time:'10:00 AM'}
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Teacher Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your classes and students efficiently.
        </p>
      </div>

      <div className="px-6">

        {/* Teacher Profile */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center">
            <Avatar size="xl" className="mr-4"/>
            <div>
              <h2 className="text-2xl font-bold">Ustad Abdul Rahman</h2>
              <p className="text-green-100">Teacher ID: TCH2024</p>
              <span className="bg-green-400/30 px-3 py-1 rounded-full text-sm">
                Mathematics Department
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <Card>
            <p className="text-gray-600">Courses Teaching</p>
            <p className="text-2xl font-bold">{quickStats.coursesTeaching}</p>
          </Card>

          <Card>
            <p className="text-gray-600">Total Students</p>
            <p className="text-2xl font-bold">{quickStats.totalStudents}</p>
          </Card>

          <Card>
            <p className="text-gray-600">Assignments To Review</p>
            <p className="text-2xl font-bold">{quickStats.assignmentsToReview}</p>
          </Card>

          <Card>
            <p className="text-gray-600">Today's Classes</p>
            <p className="text-2xl font-bold">{quickStats.todayClasses}</p>
          </Card>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <Card title="Class Attendance Overview">
            <BarChartComponent
              data={classAttendanceData}
              dataKey="rate"
              nameKey="month"
            />
          </Card>

          <Card title="Average Student Performance">
            <LineChartComponent
              data={classPerformanceData}
              dataKey="score"
              nameKey="subject"
            />
          </Card>

        </div>

        {/* Activity + Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card title="Recent Class Activity">
            <ul>
              {recentActivity.map(a => (
                <li key={a.id} className="py-3 border-b">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-gray-500">
                    {a.student && `${a.student} • `}
                    {a.course} • {formatDate(a.date)}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Upcoming Classes">
            <ul>
              {upcomingClasses.map(c => (
                <li key={c.id} className="py-3 border-b">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(c.date)} — {c.time}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
