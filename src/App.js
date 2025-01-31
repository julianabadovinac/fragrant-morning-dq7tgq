import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LatestMovieTheme from "./components/LatestMovieTheme";
import MovieSubmissionForm from "./components/MovieSubmissionForm";
import ComingSoon from "./components/ComingSoon.js";
import "./App.css";
import logo from "./logo.png";
import { useState } from "react";

function App() {
  const [themeTitle, setThemeTitle] = useState("");

  return (
    <div className="app-container">
      <img src={logo} alt="Movie Club Logo" className="club-logo" />
      <LatestMovieTheme setThemeTitle={setThemeTitle} />

      <MovieSubmissionForm themeTitle={themeTitle} />
    </div>
  );
}

export default App;
