import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../DisplayLayout/HomeLayout";
import Errorpage from "../pages/Errorpage";
import Signin from "../Authentication/Signin";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Authentication/Register";
import ForgotPassword from "../Authentication/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Errorpage></Errorpage>,
  },
  {

    path:"/profile",
    element: <PrivateRoute><Profile></Profile></PrivateRoute>,
    errorElement: <Errorpage></Errorpage>,

  
},
  {
    path:"auth",
    element: <AuthLayout></AuthLayout>,
    children:[
      {
        path: "/auth/login",
        element: <Signin />,
        // errorElement: <Errorpage></Errorpage>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
        // errorElement: <Errorpage></Errorpage>,
      },
      {

          path: "/auth/forgot",
          element: <ForgotPassword></ForgotPassword>,
          // errorElement: <Errorpage></Errorpage>,
        
      }

    ]
  }


  
]);

export default router;
