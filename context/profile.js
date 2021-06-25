//Import Libraires
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

//Create Context
const ProfileContext = createContext();

// requests
import { getProfileReq } from "@/utils/requests/account";
import { getProfileReq as getPublicProfileReq } from "@/utils/requests/public-profile";

export const ProfileProvider = ({ children }) => {
  // states
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [slugData, setslugData] = useState(null);

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("linqToken", token);
      getProfileReq(token)
        .then((res) => {
          localStorage.setItem("profile", JSON.stringify(res));
          setProfile(res);
        })
        .catch(() => toast.error("Failed to get the profile!"));
      getPublicProfileReq(token)
        .then((res) => {
          setslugData(res);
        })
        .catch(() => toast.error("Failed to get the public profile!"));
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
        slugData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
