import soyo from './assets/soyo.webp';
import tomori from './assets/tomori.webp';
import anon from './assets/anon.webp';
import taki from './assets/taki.webp';
import raana from './assets/raana.webp';
import Wrapper from "./components/Wrapper";
import Filters from "./components/Filters";
import Navbar from './components/Navbar';
import About  from './components/About';
import Card from './components/Card';
import { useState } from 'react';
import './App.css'

function App() {
  const profiles =[
    {id: 0, name: "Soyo", title: "bass", image: soyo},
    {id: 1, name: "Tomori", title: "singer", image: tomori},
    {id: 2, name: "Anon", title: "guitar", image: anon},
    {id: 3, name: "Taki", title: "drum", image: taki},
    {id: 4, name: "Raana", title: "guitar", image: raana},
  ];
  const titles = [...new Set(profiles.map((profile) => profile.title))];
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((prev)=> !prev);
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
        <button onClick={handleClick}>
          {clicked ? "Clicked" : "Click me"}
        </button>
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