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
import ArtifactDetails from "../pages/ArtifactDetails";
import UpdateArtifact from "../pages/UpdateArtifact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Errorpage />,
  },
  {
    path: "/all-artifacts",
    element: <AllArtifactsPage />,
    loader:()=>fetch(`http://localhost:5000/artifacts`),
    errorElement: <Errorpage />,
  },
  {
    path: "/add-artifacts",
    element: (
      <PrivateRoute>
        <AddArtifact />
      </PrivateRoute>
    ),
    errorElement: <Errorpage />,
  },
  {
    path: "/artifact/:id",
    element: (
      <PrivateRoute>
        <ArtifactDetails />
      </PrivateRoute>
    ),
    errorElement: <Errorpage />,
  },
  {
    path: "/liked-artifacts",
    element: (
      <PrivateRoute>
        <LikedArtifact />
      </PrivateRoute>  
    ),
    loader:()=>fetch(`http://localhost:5000/artifacts`),
    errorElement: <Errorpage />,
  },
  {
    path: "/update-artifact/:id",
    element:(
      <PrivateRoute>
        <UpdateArtifact></UpdateArtifact>
      </PrivateRoute>
    )
  },
  {
    path: "/my-artifacts",
    element: (
      <PrivateRoute>
        <MyArtifact />
      </PrivateRoute>
    ),
    
    errorElement: <Errorpage />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
    errorElement: <Errorpage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
