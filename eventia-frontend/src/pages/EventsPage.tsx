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
        console.error(err);
        setError("No se pudieron cargar los eventos");
      } finally {
        setCargando(false);
      }
    };

    cargarEventos();
  }, []);

  if (cargando) return <p>Cargando eventos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Eventos</h1>

      {eventos.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        eventos.map((evento) => (
          <div key={evento.id}>
            <h2>{evento.nombre}</h2>
            <p>{evento.descripcion}</p>
            <p>Fecha: {evento.fechaEvento}</p>
            <p>Hora: {evento.horaEvento}</p>
            <p>Precio: {evento.precioEntrada} €</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default EventsPage;