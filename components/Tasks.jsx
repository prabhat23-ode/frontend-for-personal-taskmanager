import Nav from "../components/Nav.jsx";
import { TbTrashXFilled } from "react-icons/tb";
import { RiEditFill } from "react-icons/ri";
import api from "../src/Constant.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function App() {
  const { taskId } = useParams();
  const [task, setTask] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    complete: false,
    taskId: taskId,
  });

  useEffect(() => {
    (async () => {
      // Redirect to login if not authenticated
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
      } catch (e) {
        return navigate("/login");
      }
      try {
        const response = await api.get(`/sub-task/sub-tasks/${taskId}`);
        setTask(response.data);
        console.log("successsful");
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [taskId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      taskId: taskId,
      [e.target.name]: e.target.value,
    });
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/sub-task/delete-sub/${id}`);
      setTask((previousTask) => previousTask.filter((task) => task._id !== id));
      console.log("successfull");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    console.log("submitting data");
    // e.preventDefault();
    try {
      await api.post("/sub-task/new-sub", formData);
      console.log("task created successfully");
      setFormData({
        title: "",
        deadline: "",
        complete: false,
      });
    } catch (err) {
      console.error(`Error Creating task || ${err.message}`);
    }
  };

  // complete status
  const handleToggleComplete = async (id, newStatus) => {
    try {
      const response = await api.put(`/sub-task/update-sub/${id}`, {
        complete: newStatus,
      });

      if (response.data) {
        setTask((prevTasks) =>
          prevTasks.map((t) =>
            t._id === id ? { ...t, complete: newStatus } : t
          )
        );
      }
    } catch (err) {
      console.error("Error updating completion:", err.message);
    }
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 mx-4 my-2 text-[rgb(250,235,215)]"
        >
          <label htmlFor="addTask">Add a Task</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter text"
            className="border border-gray-300 bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="deadline">Complete Before</label>
          <input
            type="date"
            name="deadline"
            onChange={handleChange}
            className="border border-gray-300 bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ADD
          </button>
        </form>
      </div>
      <div className="mx-4 my-6 max-w-xl text-[rgb(250,235,215)]">
        <ul className="list-decimal ml-6 space-y-4">
          {task.map((task) => (
            <li key={task._id}>
              <div
                id="task"
                className="flex items-center justify-between px-4 py-2 rounded-xl"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() =>
                      handleToggleComplete(task._id, !task.complete)
                    }
                  />
                </div>
                {/* Task Content */}
                <p className="truncate w-64">{task.title}</p>
                <p className="text-xs">
                  complete before <span>{task.deadline}</span>
                </p>
                <button className=" text-xl transition-all duration-300 hover:text-blue-400">
                  <RiEditFill />
                </button>

                {/* Menu Icon */}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="hover:text-red-400 text-xl transition-all duration-300 cursor-pointer"
                >
                  <TbTrashXFilled />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
