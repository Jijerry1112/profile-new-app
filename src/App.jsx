import Navbar from "./components/Navbar";
import { useState, useContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FetchedProfilePage from "./pages/FetchedProfilePage";
import AddProfilePage from "./pages/AddProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileLayoutPage from "./pages/ProfileLayoutPage";

import ModeContext from "./context/ModeContext";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleSearch = (event) => setName(event.target.value);
  const handleClear = () => {
    setTitle("");
    setName("");
  };

  const { theme } = useContext(ModeContext);

  return (
    <HashRouter>
      <div className={theme}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                handleChangeTitle={handleChangeTitle}
                handleSearch={handleSearch}
                handleClear={handleClear}
                title={title}
                name={name}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fetched-profiles" element={<FetchedProfilePage />} />
          <Route path="/fetched-profiles/profile" element={<ProfileLayoutPage />}>
            <Route path=":id" element={<ProfileDetailPage />} />
          </Route>
          <Route path="/add-profile" element={<AddProfilePage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;