/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Signin = () => {
  const { userLogin } = useContext(AuthContext);
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
          console.log('sign in' ,result.user.email);

          const  user ={ email: email }
          // axios.post('https://historical-artifacts-tracker-server-blue.vercel.app/jwt', user ,{ withCredentials : true})
          // .then(res=>{
          //   console.log(res.data)
          // })
        // Redirect to previous route or home
        navigate(location?.state?.from || "/");
      })
      .catch((err) => {
        setError({ ...error, login: "Invalid email or password" });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-10/12 mx-auto card bg-base-100 lg:w-full max-w-lg shrink-0 rounded-lg p-10">
        <h2 className="text-3xl text-yellow-400 font-semibold text-center">
          Login your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            {error.login && (
              <label className="label text-sm text-red-600">
                {error.login}
              </label>
            )}
            <label className="label">
              <Link to="/auth/forgot" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary bg-yellow-400 border-none text-gray-600 rounded-lg">
              Login
            </button>
          </div>
        </form>
        <p className="text-center font-semibold">
          Don’t Have An Account?{" "}
          <Link to="/auth/register" className="text-red-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
