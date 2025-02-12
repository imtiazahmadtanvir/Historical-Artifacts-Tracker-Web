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

    createNewUser(email, password, photo)
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch(() => {
        setError((prevError) => ({
          ...prevError,
          register: "Failed to register. Please try again.",
        }));
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {error.name && <p className="text-red-300 text-sm mt-1">{error.name}</p>}
          </div>
          <div>
            <label className="block text-white">Photo URL</label>
            <input
              name="photo"
              type="text"
              placeholder="Enter photo URL"
              className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label className="block text-white">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {error.password && <p className="text-red-300 text-sm mt-1">{error.password}</p>}
          </div>
          {error.register && <p className="text-red-300 text-sm mt-4">{error.register}</p>}
          <button type="submit" className="w-full py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg">
            Register
          </button>
        </form>
        <div className="flex flex-col text-center items-center gap-2 justify-center mt-6">
          <button
            onClick={handleGoogleSignUP}
            className="flex gap-2 mx-auto text-center items-center w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100"
          >
            <FaGoogle className="text-lg" /> Sign up with Google
          </button>
          <button className="flex gap-2 items-center w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100">
            <FaGithub className="text-lg" /> Sign up with Github
          </button>
        </div>
        <p className="text-center text-white mt-6">
          Already have an account? <Link to="/auth/login" className="underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
