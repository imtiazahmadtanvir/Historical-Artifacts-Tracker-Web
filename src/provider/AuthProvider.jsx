import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Define the Google login function
  const createUserWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    updateUserProfile,
    createUserWithGoogle,  // Ensure it's included
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('state capture' ,currentUser?.email)
      
      if(currentUser?.email){
        const user ={email: currentUser.email}

        axios.post('https://historical-artifacts-tracker-server-blue.vercel.app/jwt' ,user ,{withCredentials: true})
         .then(res => console.log( 'login token',res.data))
          //  setLoading(false);
      }else {
        axios.post('https://historical-artifacts-tracker-server-blue.vercel.app/logout', {}, { withCredentials: true })
            .then(res => {
                console.log('Logout:', res.data);
                // setLoading(false);
            })
        }
        setLoading(false);


    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
