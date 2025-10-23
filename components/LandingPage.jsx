import { useState } from "react";
import { Link } from "react-router";

export default function App() {
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-32">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            Let’s be more productive !
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8">
            The platform to build, and be better than what you are today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={"/login"}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
            >
              Login
            </Link>

            <Link
              to={`/signup`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            >
              Sign up
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-900">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Grow without limits</h2>
              <p className="text-gray-400 mb-6">
                Decide and complete task at your own pace.
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition">
                Start a project
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-800 py-10 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Personal Task Manager, Inc. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
