import Wrapper from "../components/Wrapper";
import AddProfileForm from "../components/AddProfileForm";


const AddProfilePage = ( { updateProfiles } ) => {
    return (
    <Wrapper id="add-profile">
        <h1>Add Profile</h1>
        <AddProfileForm onAddProfile={updateProfiles}/>
      </Wrapper>
    )
}

export default AddProfilePage;