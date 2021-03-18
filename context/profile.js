//Import Libraires
import React, { createContext, useState, useEffect } from "react";

//Create Context
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("linqToken", token);
      const getProfile = async () => {
        const response = await fetch("/api/account/profile", {
          headers: new Headers({ "Content-Type": "application/json", token }),
        });

        const data = await response.json();

        localStorage.setItem("profile", JSON.stringify(data));
        setProfile(data);
      };

      getProfile();
    } else if (localStorage.getItem("linqToken") !== null) {
      setToken(localStorage.getItem("linqToken"));
    }
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        token,
        setToken,
        profile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
