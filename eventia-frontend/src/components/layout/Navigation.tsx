import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="container">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className="nav-link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/eventos" className="nav-link">
              Eventos
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;;