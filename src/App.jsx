import soyo from './assets/soyo.webp'
import tomori from './assets/tomori.webp'
import Navbar from './components/Navbar'
import About  from './components/About'
import Card from './components/Card'
import './App.css'

function App() {
  const profiles =[
    {id: 0, name: "Soyo", title: "bass", image: soyo},
    {id: 1, name: "Tomori", title: "singer", image: tomori},
  ]

  return (
    <>
      <Navbar />
      <div className="section" id="about">
        <div className="container">
          <About />
        </div>
      </div>
      <div className="section" id="cards">
        <div className="grid">
          {profiles.map(profile =>(
            <Card key={profile.id} name={profile.name} title={profile.title} image={profile.image} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
