import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Users from './Components/Users';
import UploadCSV from './Components/Admin/UploadCSV';
import StudentLogin from './Components/Student/StudentLogin';
import FacultyLogin from './Components/Faculty/FacultyLogin';
import StudentDashboard from './Components/Student/StudentDashboard';
import FacultyDashboard from './Components/Faculty/FacultyDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
