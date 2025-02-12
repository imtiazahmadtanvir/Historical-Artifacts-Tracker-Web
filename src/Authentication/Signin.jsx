import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const Signin = () => {
  const { userLogin, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        console.log("Signed in as:", result.user.email);
        navigate(location?.state?.from || "/");
      })
      .catch(() => {
        setError({ login: "Invalid email or password" });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => navigate("/"))
      .catch(() => setError({ login: "Google sign-in failed" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {error.login && <p className="text-red-300 text-sm mt-1">{error.login}</p>}
          </div>
          <button type="submit" className="w-full py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg">
            Login
          </button>
          <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Don’t have an account? <Link to="/auth/register" className="underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
