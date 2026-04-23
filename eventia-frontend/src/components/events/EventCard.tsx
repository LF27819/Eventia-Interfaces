import type { Event } from "../../types/event";

interface EventCardProps {
  evento: Event;
}

function EventCard({ evento }: EventCardProps) {
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES");
  };

  const formatearHora = (hora: string) => {
    return hora.slice(0, 5);
  };

  return (
    <article className="card event-card">
      <span className="event-category">{evento.categoria}</span>

      <h3 className="title-events">{evento.nombre}</h3>

      <p>{evento.descripcion}</p>

      <p>
        <strong>Fecha:</strong> {formatearFecha(evento.fechaEvento)}
      </p>

      <p>
        <strong>Hora:</strong> {formatearHora(evento.horaEvento)}
      </p>

      <p>
        <strong>Precio:</strong> {evento.precioEntrada} €
      </p>

      <p>
        <strong>Modalidad:</strong> {evento.presencial ? "Presencial" : "Online"}
      </p>
    </article>
  );
}

export default EventCard;