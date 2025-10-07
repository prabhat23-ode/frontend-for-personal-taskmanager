import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { TbTrashXFilled, TbEdit } from "react-icons/tb";
import { Link } from "react-router";
import AddNewTask from "./AddTaskCollection.jsx";
import api from "../src/Constant.js";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState([]);

  const toogleComponent = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/task/tasks");
        setTask(response.data);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  const deleteTask = async (id) => {

    try {
      const response = await api.delete(`/task/delete/${id}`);
      setTask((previousTask) => previousTask.filter((task) => task._id !== id));
      console.log("successfull");
    } catch (err) {
      console.error(err.message);
    }
    toogleComponent();
  };

  return (
    <>
      <AddNewTask />

      {/* tasks and options */}
      <div className="mx-4 my-6 max-w-lg text-[rgb(250,235,215)] relative">
        <ul className="list-decimal ml-6 space-y-4">
          {task.map((task) => (
            <li key={task._id}>
              <div className="flex items-center justify-between px-4 py-2 rounded-xl hover:shadow-md hover:shadow-purple-200 duration-300">
                {/* Task Content */}
                <Link
                  to={`/task/${task._id}`}
                  className="font-medium truncate w-64 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                >
                  {task.title}
                </Link>

                {/* Menu Icon */}
                <button
                  onClick={toogleComponent}
                  className="text-[rgb(250,235,215)] hover:text-blue-400 text-xl transition-all duration-300 cursor-pointer"
                >
                  <MdMenu />
                </button>
              </div>
              {/* menu */}
              <div
                className={`absolute left-12/12 top-3 w-96 flex flex-col justify-between bg-black border border-gray-200 text-[rgb(250,235,215)] shadow-md rounded-md ${
                  isVisible ? "block" : "hidden"
                }`}
              >
                {/* edit task */}
                <div
                  onClick={toogleComponent}
                  className="px-4 py-1 flex items-center justify-between gap-2 relative text-[rgb(250,235,215)] hover:bg-gray-800 border-b border-gray-200"
                >
                  <p className="text-md font-medium">Edit</p>
                  <button className="p-1 rounded-md  text-lg font-medium">
                    <TbEdit />
                  </button>
                </div>

                {/* delete task */}
                <div
                  onClick={() => deleteTask(task._id)}
                  className="px-4 py-1 flex items-center justify-between gap-2 relative text-red-500 hover:bg-gray-800"
                >
                  <p href="#" className=" font-medium">
                    Delete
                  </p>
                  <button className="p-1 rounded-md  text-lg font-medium">
                    <TbTrashXFilled />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
