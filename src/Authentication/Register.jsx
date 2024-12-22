/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createNewUser, setUser, createUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleGoogleSignUP = () => {
    createUserWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError((prev) => ({ ...prev, google: error.message }));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    if (name.length < 5) {
      setError((prevError) => ({
        ...prevError,
        name: "Name should be more than 5 characters.",
      }));
      return;
    }

    const passwordValidation = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      length: password.length >= 6,
    };

    if (!passwordValidation.uppercase) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must contain at least one uppercase letter.",
      }));
      return;
    }
    if (!passwordValidation.lowercase) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must contain at least one lowercase letter.",
      }));
      return;
    }
    if (!passwordValidation.length) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    createNewUser(email, password,photo)
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((err) => {
        setError((prevError) => ({
          ...prevError,
          register: "Failed to register. Please try again.",
        }));
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
              {error.name && <p className="text-red-500 text-xs mt-1">{error.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo URL</label>
              <input
                name="photo"
                type="text"
                placeholder="Enter photo URL"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
              {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
            </div>
          </div>
          {error.register && <p className="text-red-500 text-sm mt-4">{error.register}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-100 mt-6"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col text-center items-center  gap-2 justify-center  mt-6">
          <button
            onClick={handleGoogleSignUP}
            className="flex  gap-2 mx-auto text-center items-center  w-full bg-gray-100 border rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50"
          >
            <FaGoogle className="text-lg" /> Sign up with Google
          </button>
          <button className="flex gap-2 items-center w-full bg-white border rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50">
            <FaGithub className="text-lg" /> Sign up with Github
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
