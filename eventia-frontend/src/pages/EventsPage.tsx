import { useEffect, useState } from "react";
import { getEventos } from "../api/eventService";
import type { Event } from "../types/event";
import EventCard from "../components/events/EventCard";

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
                <EventCard key={evento.id} evento={evento} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsPage;