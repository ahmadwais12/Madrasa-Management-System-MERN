import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const TeacherPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [user] = useLocalStorage('teacherUser', {
    name: 'Ustad Abdul Rahman',
    role: 'Teacher',
    employeeId: 'TCH2024001',
    email: 'teacher@example.com',
  });

  /* ================= RESIZE ================= */
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ================= UPDATED TEACHER MENU ================= */
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '', type: 'link' },

    {
      id: 'academic',
      label: 'Academic',
      type: 'dropdown',
      items: [
        { id: 'subjects', label: 'My Subjects', path: 'subjects' },
        { id: 'students', label: 'My Students', path: 'students' },
        { id: 'assignments', label: 'Assignments', path: 'assignments' },
      ],
    },

    {
  id: 'attendance',
  label: 'Attendance',
  type: 'dropdown',
  items: [
    { id: 'sessions', label: 'Class Sessions', path: 'sessions' },
    { id: 'mark', label: 'Mark Attendance', path: 'attendance' },
    { id: 'reports', label: 'Attendance Reports', path: 'attendance-reports' },
  ],
},

    {
  id: 'exams',
  label: 'Exams',
  type: 'dropdown',
  items: [
    { id: 'exams', label: 'My Exams', path: 'exams' },
    { id: 'create-exam', label: 'Create Exam', path: 'exams/create' },
  ],
},
    {
  id: 'results',
  label: 'Results',
  type: 'dropdown',
  items: [
    { id: 'enter-marks', label: 'Enter Marks', path: 'results/enter-marks' },
    { id: 'view-results', label: 'View Results', path: 'results/view-results' },
  ],
},
    {
      id: 'communications',
      label: 'Communications',
      type: 'dropdown',
      items: [
        { id: 'complaints', label: 'Assigned Complaints', path: 'complaints' },
        { id: 'messages', label: 'Messages', path: 'messages' },
      ],
    },

    { id: 'profile', label: 'Profile', path: 'profile', type: 'link' },
  ];

  /* ================= HELPERS ================= */
  const handleNavigation = (path) => {
    navigate(path ? `/teacher/${path}` : '/teacher');
    if (window.innerWidth < 640) setSidebarOpen(false);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const isActive = (path) => {
    if (!path) return location.pathname === '/teacher';
    return location.pathname === `/teacher/${path}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherToken');
    navigate('/');
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-md fixed md:relative z-30 h-full transition-all ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 border-b">
          <h1 className={`font-bold ${sidebarOpen ? 'block' : 'hidden'}`}>
            Madrasa EMIS
          </h1>
          <p className={`text-xs ${sidebarOpen ? 'block' : 'hidden'}`}>
            Teacher Panel
          </p>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.type === 'link' ? (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full px-4 py-2 rounded ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="w-full px-4 py-2 flex justify-between hover:bg-gray-100 rounded"
                    >
                      {item.label}
                      <span>{openDropdown === item.id ? '▲' : '▼'}</span>
                    </button>

                    {openDropdown === item.id && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.items.map((sub) => (
                          <li key={sub.id}>
                            <button
                              onClick={() => handleNavigation(sub.path)}
                              className={`w-full text-left px-3 py-2 rounded ${
                                isActive(sub.path)
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t text-sm">
          <p className="font-medium">{user.name}</p>
          <p className="text-gray-500">{user.role}</p>

          <button
            onClick={handleLogout}
            className="mt-2 text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherPanel;