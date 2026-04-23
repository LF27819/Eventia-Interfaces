import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navigation() {
    const { user, logout, loadingSession } = useAuth();

    if (loadingSession) {
        return (
            <nav className="navigation">
                <div className="container">
                    <p>Cargando sesión...</p>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navigation">
            <div className="container nav-container">
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
                </ul>

                <div className="nav-session">
                    {user ? (
                        <>
                            <NavLink to="/perfil" className="nav-link">
                                Perfil
                            </NavLink>

                            <span className="nav-user">Hola, {user.nombre}</span>

                            <button className="logout-button" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>

                            <NavLink to="/register" className="nav-link">
                                Registro
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;