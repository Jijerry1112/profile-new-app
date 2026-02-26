import { createContext, useState, useCallback, useMemo } from "react";

import soyo from "../assets/soyo.webp";
import tomori from "../assets/tomori.webp";
import anon from "../assets/anon.webp";
import taki from "../assets/taki.webp";
import raana from "../assets/raana.webp";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([
    { id: 0, name: "Soyo", title: "bass", email: "", bio: "", image: soyo },
    { id: 1, name: "Tomori", title: "singer", email: "", bio: "", image: tomori },
    { id: 2, name: "Anon", title: "guitar", email: "", bio: "", image: anon },
    { id: 3, name: "Taki", title: "drum", email: "", bio: "", image: taki },
    { id: 4, name: "Raana", title: "guitar", email: "", bio: "", image: raana },
  ]);

  const addProfile = useCallback((profile) => {
    setProfiles((prev) => [...prev, profile]);
  }, []);

  const value = useMemo(() => {
    return { profiles, addProfile };
  }, [profiles, addProfile]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;