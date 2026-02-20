import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const FetchedProfiles = () => {
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleSearch = (event) => setName(event.target.value);
  const handleClear = () => {
    setTitle("");
    setName("");
  };

  // Fetch titles
  useEffect(() => {
    let isMounted = true;

    fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch titles");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setTitles(data.titles || []);
      })
      .catch(() => {
        if (!isMounted) return;
        setTitles([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch profiles (with filters)
  useEffect(() => {
    let isMounted = true;

    const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(
      title
    )}&name=${encodeURIComponent(name)}`;

    setLoading(true);
    setError("");

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profiles");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setProfiles(data.profiles || []);
      })
      .catch(() => {
        if (!isMounted) return;
        setProfiles([]);
        setError("Could not load profiles. Please try again.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [title, name]);

  return (
    <>
      <Filters
        titles={titles}
        title={title}
        name={name}
        handleChange={handleChangeTitle}
        handleSearch={handleSearch}
        handleClick={handleClear}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <Link
                key={profile.id}
                to={`/fetched-profiles/profile/${profile.id}`}
              >
                <Card
                  name={profile.name}
                  title={profile.title}
                  image={profile.image_url}
                />
              </Link>
            ))
          ) : (
            <p>No profiles selected.</p>
          )}
        </div>
      )}
    </>
  );
};

export default FetchedProfiles;