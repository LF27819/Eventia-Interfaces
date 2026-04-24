import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getReservas } from "../api/bookingService";
import type { Booking } from "../types/booking";
import SummaryCard from "../components/dashboard/SummaryCard";
import BookingsDashboardTable from "../components/dashboard/BookingsDashboardTable";

function MyBookingsPage() {
  const { user } = useAuth();

  const [reservas, setReservas] = useState<Booking[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [estado, setEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const data = await getReservas();
        setReservas(data);
      } catch (err) {
        console.error("Error al cargar reservas:", err);
        setError("No se pudieron cargar tus reservas");
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  const misReservas = useMemo(() => {
    return reservas.filter((reserva) => reserva.usuario?.email === user?.email);
  }, [reservas, user]);

  const reservasFiltradas = useMemo(() => {
    return misReservas.filter((reserva) => {
      const coincideBusqueda =
        reserva.evento?.nombre
          ?.toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        reserva.codigoReserva.toLowerCase().includes(busqueda.toLowerCase());

      const coincideEstado =
        estado === "" ||
        (estado === "confirmada" && reserva.confirmada) ||
        (estado === "pendiente" && !reserva.confirmada);

      return coincideBusqueda && coincideEstado;
    });
  }, [misReservas, busqueda, estado]);

  const totalReservas = misReservas.length;
  const reservasConfirmadas = misReservas.filter(
    (reserva) => reserva.confirmada
  ).length;
  const gastoTotal = misReservas.reduce(
    (acc, reserva) => acc + reserva.precioTotal,
    0
  );

  return (
    <section className="page">
      <div className="container">
        <h2 className="page-title">Mis reservas</h2>

        {cargando && <p>Cargando reservas...</p>}
        {error && <p className="error-message">{error}</p>}

        {!cargando && !error && (
          <>
            <div className="summary-grid">
              <SummaryCard
                title="Total reservas"
                value={totalReservas}
                description="Reservas realizadas"
              />

              <SummaryCard
                title="Confirmadas"
                value={reservasConfirmadas}
                description="Reservas activas"
              />

              <SummaryCard
                title="Gasto total"
                value={`${gastoTotal} €`}
                description="Importe acumulado"
              />
            </div>

            <div className="filters-bar">
              <input
                type="text"
                placeholder="Buscar por evento o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="filter-input"
              />

              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="filter-select"
              >
                <option value="">Todos los estados</option>
                <option value="confirmada">Confirmadas</option>
                <option value="pendiente">Pendientes</option>
              </select>
            </div>

            <BookingsDashboardTable reservas={reservasFiltradas} />
          </>
        )}
      </div>
    </section>
  );
}

export default MyBookingsPage;