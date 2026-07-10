import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AnalysisReport from './pages/AnalysisReport/AnalysisReport'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import ResumeHistory from './pages/ResumeHistory/ResumeHistory'
import Signup from './pages/Signup/Signup'
import UploadResume from './pages/UploadResume/UploadResume'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload-resume" element={<UploadResume />} />
        <Route path="analysis-report" element={<AnalysisReport />} />
        <Route path="resume-history" element={<ResumeHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App