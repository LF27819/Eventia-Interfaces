import { useEffect, useMemo, useState } from "react";
import { getEventos } from "../api/eventService";
import type { Event } from "../types/event";
import SummaryCard from "../components/dashboard/SummaryCard";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import EventsDashboardTable from "../components/dashboard/EventsDashboardTable";

type SortMode = "fecha" | "precio";

function AdminPage() {
    const [eventos, setEventos] = useState<Event[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [sortMode, setSortMode] = useState<SortMode>("fecha");

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const data = await getEventos();
                setEventos(data);
            } catch (err) {
                console.error("Error al cargar eventos del dashboard:", err);
                setError("No se pudieron cargar los datos del dashboard");
            } finally {
                setCargando(false);
            }
        };

        cargarEventos();
    }, []);

    const categories = useMemo(() => {
        return [...new Set(eventos.map((evento) => evento.categoria))];
    }, [eventos]);

    const eventosFiltrados = useMemo(() => {
        return eventos
            .filter((evento) => {
                const coincideBusqueda = evento.nombre
                    .toLowerCase()
                    .includes(search.toLowerCase());

                const coincideCategoria =
                    category === "" || evento.categoria === category;

                const coincideFecha =
                    selectedDate === "" || evento.fechaEvento === selectedDate;

                return coincideBusqueda && coincideCategoria && coincideFecha;
            })
            .sort((a, b) => {
                if (sortMode === "precio") {
                    return a.precioEntrada - b.precioEntrada;
                }

                return (
                    new Date(a.fechaEvento).getTime() -
                    new Date(b.fechaEvento).getTime()
                );
            });
    }, [eventos, search, category, selectedDate, sortMode]);

    const totalEventos = eventos.length;
    const eventosActivos = eventos.filter((evento) => !evento.cancelado).length;
    const eventosOnline = eventos.filter((evento) => !evento.presencial).length;

    return (
        <section className="page">
            <div className="container">
                <h2 className="page-title">Panel de administración</h2>

                {cargando && <p>Cargando dashboard...</p>}
                {error && <p className="error-message">{error}</p>}

                {!cargando && !error && (
                    <>
                        <div className="summary-grid">
                            <SummaryCard
                                title="Total eventos"
                                value={totalEventos}
                                description="Eventos registrados"
                            />
                            <SummaryCard
                                title="Eventos activos"
                                value={eventosActivos}
                                description="No cancelados"
                            />
                            <SummaryCard
                                title="Eventos online"
                                value={eventosOnline}
                                description="Modalidad no presencial"
                            />
                        </div>

                        <DashboardFilters
                            search={search}
                            category={category}
                            selectedDate={selectedDate}
                            categories={categories}
                            onSearchChange={setSearch}
                            onCategoryChange={setCategory}
                            onDateChange={setSelectedDate}
                        />

                        <div className="sort-actions">
                            <button
                                className="login-button"
                                onClick={() => setSortMode("fecha")}
                            >
                                Ordenar por fecha
                            </button>

                            <button
                                className="login-button"
                                onClick={() => setSortMode("precio")}
                            >
                                Ordenar por precio
                            </button>
                        </div>

                        <EventsDashboardTable
                            eventos={eventosFiltrados}
                            onSortByDate={() => setSortMode("fecha")}
                            onSortByPrice={() => setSortMode("precio")}
                        />
                    </>
                )}
            </div>
        </section>
    );
}

export default AdminPage;