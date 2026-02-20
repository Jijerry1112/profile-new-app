import { Outlet, Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";

const ProfileLayoutPage = () => {
  return (
    <>
      <Outlet />
      <Wrapper>
        <Link to="/fetched-profiles" className="button" style={{display: "inline-block", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>Go Back</Link>
      </Wrapper>
    </>
  );
};

export default ProfileLayoutPage;