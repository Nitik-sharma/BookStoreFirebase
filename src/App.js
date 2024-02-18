// pages
import Registeation from "./pages/Registeation";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarPage from "./Components/Navbar";

function App() {
  return (
    <div className="">
      <NavbarPage />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Registeation />} />
        <Route path="/book/list" element={<ListingPage />} />
      </Routes>
    </div>
  );
}

export default App;
