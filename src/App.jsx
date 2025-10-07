import { Routes, Route } from "react-router";
import { useEffect } from "react";
import "./App.css";
import Nav from "../components/Nav.jsx";
import TaskCollection from "../components/TaskCollection.jsx";
import Tasks from "../components/Tasks.jsx";

export default function App() {

  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Routes>
          {/* <Route path="/" element={}/> */}
          <Route path="/tasks" element={<TaskCollection />} />
          <Route path="/task/:taskId" element={<Tasks />} />
        </Routes>
      </main>
    </>
  );
}
