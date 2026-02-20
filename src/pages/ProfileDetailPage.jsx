import Wrapper from "../components/Wrapper";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(
      `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`,
    )
      .then((res) => res.json())
      .then((res) => setProfile(res));
  }, [id]);

  return profile ? (
    <Wrapper>
      <h1>{profile.name}</h1>
      <img src={profile.image_url} alt={profile.name} width="500" style={{margin: "1rem auto"}}/>
      <p style={{textAlign: "center"}}>{profile.email}</p>
      <p style={{textAlign: "center"}}>{profile.title}</p>
      <p style={{textAlign: "center"}}>{profile.bio}</p>
    </Wrapper>
  ) : (
    <Wrapper>
      <p>Loading</p>
    </Wrapper>
  );
};

export default ProfileDetailPage;