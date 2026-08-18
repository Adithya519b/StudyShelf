import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/faculty/FacultyLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import PdfViewer from "./pages/student/PdfViewer";

import StudentProfile from "./pages/student/StudentProfile";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import MyDownloads from "./pages/student/MyDownloads";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageFaculty from "./pages/admin/ManageFaculty";
import StudentRegister from "./pages/StudentRegister";
import FacultyRegister from "./pages/faculty/FacultyRegister";
import StudentNotifications from "./pages/student/StudentNotifications";

function App() {
  return (
    <BrowserRouter basename="/StudyShelf">
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/student-login" element={<StudentLogin />} />

        <Route path="/faculty-login" element={<FacultyLogin />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
          
        />
        <Route path="/pdf-viewer" element={<PdfViewer/>}/>
        
        <Route
          path="/faculty-dashboard"
          element={<FacultyDashboard />}
        />
        <Route
        path="/my-downloads"
        element={<MyDownloads/>}
        />
        <Route

          path="/manage-faculty"

          element={<ManageFaculty />}

      />
        <Route
            path="/manage-students"
            element={<ManageStudents />}
        />
        <Route
            path="/student-notifications"
            element={<StudentNotifications />}
        />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
            path="/faculty-register"
            element={<FacultyRegister />}
        />
        <Route

              path="/student-register"

              element={<StudentRegister />}

          />

        <Route path="/student-profile" element={<StudentProfile />} />
       <Route
          path="/faculty-profile"
          element={<FacultyProfile />}
        />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;