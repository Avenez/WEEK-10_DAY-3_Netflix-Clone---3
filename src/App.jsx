import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import MyFooter from "./components/MyFooter";
import MyHomePage from "./components/MyHomePage";
import { Component, useState } from "react";
import MyProfilePage2 from "./components/MyProfilePage2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import MyFilmList from "./components/MyFilmList";
// import MyTvShowsHeader from "./components/MyTvShowsHeader";

const App = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [isSettingsOn, setIsSettingsOn] = useState(false);

  const profileToggle = () => {
    setIsSettingsOn(!isSettingsOn);
  };

  const changeProfilePicture = (file) => {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);

    fReader.onload = () => {
      const filePath = fReader.result;
      setProfilePicture(filePath);
      console.log(file);
    };
  };

  return (
    // nella navbar, il menù relativo al profilo, sull'opzione impostazioni, cambia lo stato dell'app permettendo di renderizzare la pagina del profilo.
    // Questa è commentata al suo interno con le sue funzionalità
    <Router>
      <div className="App">
        <header className="container-fluid bg-dark position-sticky top-0">
          <MyNavBar profileToggle2={profileToggle} isSettingsOnCheck={isSettingsOn} profilePicture2={profilePicture} />
        </header>

        <main className="container-fluid bg-dark">
          <Routes>
            <Route path="/" element={<MyHomePage />} />
            <Route
              path="/Profile"
              element={
                <MyProfilePage2 changeProfilePicture2={changeProfilePicture} profilePicturePage={profilePicture} />
              }
            />
            {/* <Route path="/TvShows" element={MyTvShows} /> */}
          </Routes>
        </main>
        {/* --------FOOTER-------- */}
        <footer className="container-fluid  bg-dark">
          <MyFooter />
        </footer>
      </div>
    </Router>
  );
};

export default App;
