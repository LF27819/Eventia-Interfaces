import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <section className="page">
      <div className="container">
        <div className="card profile-card">
          <h2>Mi perfil</h2>

          <p>
            <strong>Nombre:</strong> {user.nombre}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Rol:</strong> {user.rol}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;