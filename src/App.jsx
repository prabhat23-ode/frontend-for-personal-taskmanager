import { Routes, Route } from "react-router";
import { useEffect } from "react";
import "./App.css";
import LandingPage from "../components/LandingPage.jsx";
import TaskCollection from "../components/TaskCollection.jsx";
import Tasks from "../components/Tasks.jsx";
import SignupForm from "../components/SignupForm.jsx"
import LoginForm from "../components/LoginForm.jsx"

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/tasks" element={<TaskCollection />} />
          <Route path="/task/:taskId" element={<Tasks />} />
        </Routes>
      </main>
    </>
  );
}
