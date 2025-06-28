import '../../assets/styles/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="main-navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className="navbar-link">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/login" title='Iniciar Sesión' className="navbar-link">Iniciar Sesión</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;