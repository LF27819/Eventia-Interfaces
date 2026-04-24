import type { Event } from "../../types/event";
import { useAuth } from "../../context/AuthContext";
import { createReserva } from "../../api/bookingService";

interface EventCardProps {
    evento: Event;
}

function EventCard({ evento }: EventCardProps) {
    const { user } = useAuth();

    const handleReservar = async () => {
        if (!user?.id) {
            alert("Usuario no válido");
            return;
        }

        try {
            console.log("Usuario al reservar:", user);
            console.log("Evento al reservar:", evento);
            await createReserva({
                fechaReserva: new Date().toISOString().slice(0, 19),
                cantidadEntradas: 1,
                precioTotal: evento.precioEntrada,
                metodoPago: "TARJETA",
                codigoReserva: `RES-${Date.now()}`,
                confirmada: true,
                usuario: { id: user.id },
                evento: { id: evento.id },
            });

            alert("Reserva realizada correctamente 🎉");
        } catch (error: any) {
            console.error("Error al reservar:", error);
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);
            alert("No se pudo realizar la reserva");
        }
    };

    return (
        <article className="card event-card">
            <span className="event-category">{evento.categoria}</span>

            <h3 className="title-events">{evento.nombre}</h3>

            <p>{evento.descripcion}</p>

            <p>
                <strong>Fecha:</strong>{" "}
                {new Date(evento.fechaEvento).toLocaleDateString("es-ES")}
            </p>

            <p>
                <strong>Hora:</strong> {evento.horaEvento.slice(0, 5)}
            </p>

            <p>
                <strong>Precio:</strong> {evento.precioEntrada} €
            </p>

            <p>
                <strong>Entradas disponibles:</strong> {evento.entradasDisponibles}
            </p>

            <p>
                <strong>Estado:</strong> {evento.cancelado ? "Cancelado" : "Activo"}
            </p>

            {user?.rol === "CLIENTE" && (
                <div className="event-actions">
                    <button className="reserve-button" onClick={handleReservar}>
                        Reservar
                    </button>
                </div>
            )}
        </article>
    );
}

export default EventCard;