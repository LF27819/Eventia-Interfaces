import { useEffect, useState } from "react";
import { getEventos } from "../api/eventService";
import type { Event } from "../types/event";

function EventsPage() {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data = await getEventos();
        setEventos(data);
      } catch (err) {
        console.error("Error al cargar eventos:", err);
        setError("No se pudieron cargar los eventos");
      } finally {
        setCargando(false);
      }
    };

    cargarEventos();
  }, []);

  return (
    <section className="page">
      <div className="container">
        <h2 className="page-title">Eventos</h2>

        {cargando && <p>Cargando eventos...</p>}
        {error && <p className="error-message">{error}</p>}

        {!cargando && !error && (
          <div className="events-grid">
            {eventos.length === 0 ? (
              <p>No hay eventos disponibles.</p>
            ) : (
              eventos.map((evento) => (
                <article key={evento.id} className="card event-card">
                  <span className="event-category">{evento.categoria}</span>
                  <h3 className="title-events">{evento.nombre}</h3>
                  <p>{evento.descripcion}</p>
                  <p>
                    <strong>Fecha:</strong> {evento.fechaEvento}
                  </p>
                  <p>
                    <strong>Hora:</strong> {evento.horaEvento}
                  </p>
                  <p>
                    <strong>Precio:</strong> {evento.precioEntrada} €
                  </p>
                  <p>
                    <strong>Modalidad:</strong>{" "}
                    {evento.presencial ? "Presencial" : "Online"}
                  </p>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsPage;