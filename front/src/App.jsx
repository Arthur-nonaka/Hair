import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navbar.jsx";
import Home from "./Home.jsx";
import Clients from "./clients/Clients.jsx";
import Finances from "./clients/Finances.jsx";
import NotesPage from "./clients/NotesPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/notes/:clientId" element={<NotesPage />} />
        <Route path="/*" element={<h1>Erro 404</h1>} />
      </Routes>
    </Router>
  );
}
