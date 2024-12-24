import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../DisplayLayout/HomeLayout";
import Errorpage from "../pages/Errorpage";
import Signin from "../Authentication/Signin";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Authentication/Register";
import ForgotPassword from "../Authentication/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import AllArtifactsPage from "../pages/AllArtifactsPage";
import MyArtifact from "../pages/MyArtifact";
import LikedArtifact from "../pages/LikedArtifact";
import AddArtifact from "../pages/AddArtifact";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Errorpage />,
  },
  {
    path: "/all-artifacts",
    element: <AllArtifactsPage />,
    errorElement: <Errorpage />,
  },
  {
    path: "/add-artifacts",
    element: <AddArtifact></AddArtifact>,
    errorElement: <Errorpage />,
  },
  {
    path: "/liked-artifacts",
    element: <LikedArtifact></LikedArtifact>,
    errorElement: <Errorpage />,
  },
  {
    path: "/my-artifacts", 
    element: <MyArtifact></MyArtifact> ,
    errorElement: <Errorpage />,
  },
  {
    path: "/profile",
    element: <PrivateRoute><Profile /></PrivateRoute>, // Protected route
    errorElement: <Errorpage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Signin />,
        errorElement: <Errorpage />,
      },
      {
        path: "/auth/register",
        element: <Register />,
        errorElement: <Errorpage />,
      },
      {
        path: "/auth/forgot",
        element: <ForgotPassword />,
        errorElement: <Errorpage />,
      },
    ],
  },
]);

export default router;
