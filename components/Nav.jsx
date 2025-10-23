import { Link } from "react-router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAdd, MdLogout } from "react-icons/md";
import { useState, useEffect } from "react";
import { setAuthToken } from "../src/Constant.js";
import { useNavigate } from "react-router";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.userName || parsed.name || "");
        setEmail(parsed.email || "");
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      setAuthToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
    setUser("");
    setEmail("");
    navigate("/");
  };

  const toogleComponent = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="w-full flex flex-col border-b border-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 text-[rgb(250,235,215)]">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-semibold">{user ? `${user}'s Tasks` : "Your Tasks"}</h2>
            <button
              onClick={toogleComponent}
              className={`text-4xl transition-all duration-300 hover:text-blue-400 ${
                isVisible ? "rotate-180" : ""
              }`}
            >
              <RiArrowDropDownLine />
            </button>
          </div>
        </div>

        {/* user menu */}
        <div
          className={`absolute left-6 top-14 w-96 flex flex-col justify-between bg-black border border-gray-200 text-[rgb(250,235,215)] shadow-md rounded-md ${
            isVisible ? "block" : "hidden"
          }`}
        >
          {/*  email */}
          <div className="flex items-center justify-between gap-2 relative px-4">
            <p className="text-sm text-[rgb(250,235,215)] font-medium">
              {email}
            </p>
            <button className="p-1 rounded-md hover:bg-gray-800 text-lg font-medium">
              <BsThreeDotsVertical />
            </button>
          </div>

          {/* create user */}
          <div className="flex flex-col gap-2 border-y py-2">
            <div className="flex items-center justify-between gap-2 px-4 relative hover:bg-gray-800 hover:text-blue-400">
              <p className="text-lg font-medium ">Create New User</p>
              <button className="p-1 rounded-md  text-lg font-medium">
                <MdAdd />
              </button>
            </div>
          </div>

          {/* Log out */}
          <div onClick={handleLogout} className="px-4 py-1 flex items-center justify-between gap-2 relative text-red-500 hover:bg-gray-800 cursor-pointer">
            <p href="#" className=" font-medium">
              Log Out
            </p>
            <button className="p-1 rounded-md  text-lg font-medium">
              <MdLogout />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 py-2">
          <ul className="flex space-x-6">
            <li>
              <Link to="/tasks" className="navMenu">
                Tasks
              </Link>
            </li>

            <li>
              <Link to="#" className="navMenu">
                Tables
              </Link>
            </li>

            <li>
              <Link to="#" className="navMenu">
                Completed
              </Link>
            </li>
            <li>
              <Link to="#" className="navMenu">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
