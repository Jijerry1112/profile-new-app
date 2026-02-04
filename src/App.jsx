import soyo from './assets/soyo.webp';
import tomori from './assets/tomori.webp';
import anon from './assets/anon.webp';
import taki from './assets/taki.webp';
import raana from './assets/raana.webp';
import Wrapper from "./components/Wrapper";
import Filters from "./components/Filters";
import Navbar from './components/Navbar';
import About  from './components/About';
import Card from "./components/Card";
import AddProfileForm from "./components/AddProfileForm";
import { useState } from 'react';
import './App.css'



function App() {

  const [profiles, setProfiles] = useState([
    { id: 0, name: "Soyo", title: "bass", email:"", bio:"", image: soyo },
    { id: 1, name: "Tomori", title: "singer", email:"", bio:"", image: tomori },
    { id: 2, name: "Anon", title: "guitar", email:"", bio:"", image: anon },
    { id: 3, name: "Taki", title: "drum", email:"", bio:"", image: taki },
    { id: 4, name: "Raana", title: "guitar", email:"", bio:"", image: raana },
  ]);

  const titles = [...new Set(profiles.map((profile) => profile.title))];
  const [mode, setMode] = useState("light");
  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));


  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((prev)=> !prev);
    console.log(clicked);
  };
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleSearch = (event) => {
    setName(event.target.value);
  };
  const handleClear = () => {
    setTitle("");
    setName("");
  };
  const updateProfiles = (profile) =>{
    setProfiles(pre => ([...pre, profile]))
  }

 const filteredProfiles = profiles.filter(
    (profile) =>
      (profile.title === title || !title) &&
      profile.name.toLowerCase().includes(name.toLowerCase()),
  );
  return (
    <>
      <Navbar />
      <Wrapper id="about">
        <About />
        <button onClick={toggleMode}>
          Mode: {mode === "light" ? "Light" : "Dark"}
        </button>
        <button onClick={handleClick}>
          {clicked ? "Clicked" : "Click me"}
        </button>
      </Wrapper>
      <Wrapper id="add-profile">
        <AddProfileForm onAddProfile={updateProfiles}/>
      </Wrapper>
      <Wrapper id="profiles">
        <Filters
          titles={titles}
          title={title}
          name={name}
          handleChange={handleChangeTitle}
          handleSearch={handleSearch}
          handleClick={handleClear}
        />
        <div className="grid">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card
                key={profile.id}
                name={profile.name}
                title={profile.title}
                image={profile.image}
                mode={mode}
              />
            ))
          ) : (
            <p>No profiles selected.</p >
          )}
        </div>
      </Wrapper>
    </>
  );
}

export default App;