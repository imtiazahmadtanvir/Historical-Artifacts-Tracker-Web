/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";
// import axios from "axios";

// const Signin = () => {
//   const { userLogin } = useContext(AuthContext);
//   const [error, setError] = useState({});
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     userLogin(email, password)
//       .then((result) => {
//           console.log('sign in' ,result.user.email);

//           const  user ={ email: email }
//           // axios.post('https://historical-artifacts-tracker-server-blue.vercel.app/jwt', user ,{ withCredentials : true})
//           // .then(res=>{
//           //   console.log(res.data)
//           // })
//         // Redirect to previous route or home
//         navigate(location?.state?.from || "/");
//       })
//       .catch((err) => {
//         setError({ ...error, login: "Invalid email or password" });
//       });
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-white">
//       <div className="w-10/12 mx-auto card bg-base-100 lg:w-full max-w-lg shrink-0 rounded-lg p-10">
//         <h2 className="text-3xl text-yellow-400 font-semibold text-center">
//           Login your account
//         </h2>
//         <form onSubmit={handleSubmit} className="card-body">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               className="input input-bordered"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               className="input input-bordered"
//               required
//             />
//             {error.login && (
//               <label className="label text-sm text-red-600">
//                 {error.login}
//               </label>
//             )}
//             <label className="label">
//               <Link to="/auth/forgot" className="label-text-alt link link-hover">
//                 Forgot password?
//               </Link>
//             </label>
//           </div>
//           <div className="form-control mt-6">
//             <button type="submit" className="btn btn-primary bg-yellow-400 border-none text-gray-600 rounded-lg">
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="text-center font-semibold">
//           Don’t Have An Account?{" "}
//           <Link to="/auth/register" className="text-red-500">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signin;



"use client"

import { useState, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"
import { motion } from "framer-motion"
import { Github, Loader2, LogIn, Mail, Lock, AlertCircle } from "lucide-react"

const Signin = () => {
  const { userLogin, createUserWithGoogle } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    createUserWithGoogle()
      .then(() => {
        setIsLoading(false)
        navigate(location?.state?.from || "/")
      })
      .catch((error) => {
        setIsLoading(false)
        setError((prevError) => ({
          ...prevError,
          google: "Google sign-in failed. Please try again.",
        }))
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({})
    setIsLoading(true)

    const form = e.target
    const email = form.email.value
    const password = form.password.value

    userLogin(email, password)
      .then(() => {
        setIsLoading(false)
        navigate(location?.state?.from || "/")
      })
      .catch((err) => {
        setIsLoading(false)
        setError({ ...error, login: "Invalid email or password. Please try again." })
      })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 overflow-hidden"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Email Address</label>
            </div>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Password</label>
            </div>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
            {error.login && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 text-red-500 text-xs mt-1"
              >
                <AlertCircle className="h-3 w-3" />
                {error.login}
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              to="/auth/forgot"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
            {isLoading ? "Signing In..." : "Sign In"}
          </motion.button>
        </motion.form>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 space-y-3">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </motion.button>

            <motion.button
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-gray-800 border border-gray-800 rounded-lg py-2.5 px-4 text-white hover:bg-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-5 w-5" />
              GitHub
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-sm text-gray-600 mt-8">
          Do not have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
          >
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Signin

