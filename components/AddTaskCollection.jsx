import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../src/Constant.js";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toogleComponent = (e) => {
    setIsVisible(!isVisible);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "1",
    importance: "not-so-important",
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // updates by field name
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await api.post("/task/new", formData);
      console.log("task created successfully");
      setFormData({
        ...formData,
        [e.target.name]: "", // clear fields
      });
      toogleComponent();
    } catch (err) {
      console.error(`Error Creating || ${err.message}`);
    }
  };

  return (
    <>
      <div className="mx-4 my-6 max-w-lg">
        <div className="flex items-center justify-between px-4 py-2 text-[rgb(250,235,215)]">
          <p className="ml-5 ">New</p>
          <button
            onClick={toogleComponent}
            className="hover:text-blue-400 text-2xl transition-all duration-300 cursor-pointer"
          >
            <MdAdd />
          </button>
        </div>
      </div>

      <div
        className={`absolute w-[30rem] left-60  z-10 ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-1"
            >
              Task Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-1"
            >
              About
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write something about your task, how do you plan to do it, or your motivation"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="importance"
              className="block text-gray-700 font-semibold mb-1"
            >
              Importance
            </label>
            <select
              name="importance"
              id="importance"
              value={formData.importance}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="not-so-important">Not so important</option>
              <option value="important">Important</option>
              <option value="very-important">Very Important</option>
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="submit"
              className="hover:bg-blue-400 hover:text-white w-full font-semibold py-2 px-4 rounded border border-gray-200 transition-colors"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={toogleComponent}
              className="hover:bg-blue-400 hover:text-white w-full font-semibold py-2 px-4 rounded border border-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
