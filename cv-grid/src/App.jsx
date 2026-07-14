import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UploadResume from "./pages/UploadResume/UploadResume";
import ResumeHistory from "./pages/ResumeHistory/ResumeHistory";
import Analysis from "./pages/Analysis/Analysis";
import AnalysisResult from "./pages/AnalysisResult/AnalysisResult";
import Profile from "./pages/Profile/Profile";
import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-history"
        element={
          <ProtectedRoute>
            <ResumeHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
  path="/analysis"
  element={
    <ProtectedRoute>
      <Analysis />
    </ProtectedRoute>
  }
/>

<Route
  path="/analysis/:id"
  element={
    <ProtectedRoute>
      <AnalysisResult />
    </ProtectedRoute>
  }
/>

</Routes>
  );
}

export default App;
