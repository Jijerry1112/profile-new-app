import { useContext } from "react";
import ProfileContext from "../context/ProfileContext";

export default function useProfiles() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfiles must be used inside <ProfileProvider>.");
  }
  return ctx; // { profiles, addProfile }
}