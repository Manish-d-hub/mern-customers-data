"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../utils/firebase-config";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logOut = () => {
    return signOut(auth);
  };

  const googleSignIn = async () => {
    const googleAuthProvider = await new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      console.log("Auth", currUser);
      setUser(currUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <userAuthContext.Provider value={{ user, logOut, googleSignIn }}>
        {children}
      </userAuthContext.Provider>

      {/* <div className="signInBtn">
        <button onClick={handleGoogle}>Sign in with Google</button>
      </div> */}
    </>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};

// export default UserAuthContextProvider;
