import { useMemo } from "react";

export default function useProfileFiltering(profiles, title, name) {
  const titles = useMemo(() => {
    return [...new Set(profiles.map((p) => p.title))];
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    const q = (name || "").toLowerCase();

    return profiles.filter((p) => {
      const matchTitle = !title || p.title === title;
      const matchName = p.name.toLowerCase().includes(q);
      return matchTitle && matchName;
    });
  }, [profiles, title, name]);

  return { titles, filteredProfiles };
}