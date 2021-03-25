//Import Libraires
import React, { createContext, useState, useEffect } from "react";

//Create Context
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [eventType, setEventType] = useState(null);

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("linqToken", token);
      const getProfile = async () => {
        let config = {
          method: "GET",
          headers: {
            Accept: "*/*",
            ContentType: "application/json",
          },
        };

        const response = await fetch(
          `https://api.lynq.app/account/profile?t=${token}`,
          config
        );

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
        eventType,
        setEventType,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
