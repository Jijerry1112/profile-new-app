import Wrapper from "../components/Wrapper";
import AddProfileForm from "../components/AddProfileForm";
import { useContext } from "react";
import ProfileContext from "../context/ProfileContext";

const AddProfilePage = () => {
  const { addProfile } = useContext(ProfileContext);

  return (
    <Wrapper id="add-profile">
      <h1>Add Profile</h1>
      <AddProfileForm onAddProfile={addProfile} />
    </Wrapper>
  );
};

export default AddProfilePage;