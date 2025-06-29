import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="main-navbar">
      <button className="navbar-toggle" onClick={toggleNavbar} aria-label="Menú">
        ☰
      </button>

      <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" className="navbar-link" onClick={() => setIsOpen(false)}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="navbar-link" onClick={() => setIsOpen(false)}>Iniciar Sesión</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;