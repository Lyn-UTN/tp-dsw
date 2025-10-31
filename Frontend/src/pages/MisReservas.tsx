"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Clock } from "lucide-react";
import { getReservas, updateReserva } from "@/api/reserva-api";

interface Reserva {
  idReserva: number;
  fechaReserva: string;
  fechaDesde: string;
  fechaHasta: string;
  horaDesde: string;
  horaHasta: string;
  estadoRes: "pendiente" | "confirmada" | "cancelada";
  garage: {
    titulo: string;
    direccion: string;
  };
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //  cargar reservas del backend
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await getReservas();
        setReservas(data.data);
      } catch (err) {
        console.error("Error al obtener reservas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusBadgeStyle = (
    estado: "pendiente" | "confirmada" | "cancelada"
  ) => {
    const styles = {
      pendiente: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      confirmada: "bg-green-100 text-green-800 border border-green-300",
      cancelada: "bg-red-100 text-red-800 border border-red-300",
    };
    return styles[estado];
  };

  const getStatusLabel = (estado: "pendiente" | "confirmada" | "cancelada") => {
    const labels = {
      pendiente: "Pendiente",
      confirmada: "Confirmada",
      cancelada: "Cancelada",
    };
    return labels[estado];
  };

  //  cancelar reserva
  const handleCancelar = async (id: number) => {
    if (!confirm("¿Seguro que querés cancelar esta reserva?")) return;
    try {
      await updateReserva(id, { estadoRes: "cancelada" });
      setReservas((prev) =>
        prev.map((r) =>
          r.idReserva === id ? { ...r, estadoRes: "cancelada" } : r
        )
      );
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
      alert("No se pudo cancelar la reserva");
    }
  };

  //  confirmar reserva
  const handleConfirmar = async (id: number) => {
    try {
      await updateReserva(id, { estadoRes: "confirmada" });
      setReservas((prev) =>
        prev.map((r) =>
          r.idReserva === id ? { ...r, estadoRes: "confirmada" } : r
        )
      );
    } catch (err) {
      console.error("Error al Confirmar reserva:", err);
      alert("No se pudo Confirmar la reserva");
    }
  };

  //   handler para modificar reserva
  const handleModificar = async (id: number) => {
    // Redirigir a la página de edición de reserva
    navigate(`/reserva/editar/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">Cargando reservas...</div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-light">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mis Reservas</h1>
          <p className="text-muted-foreground mt-2">
            Aquí puedes ver y gestionar todas tus reservas
          </p>
        </div>

        <div className="space-y-4">
          {reservas.length > 0 ? (
            reservas.map((reserva) => {
              const estado = reserva.estadoRes;
              const mostrarBotones = estado === "pendiente";

              return (
                <Card
                  key={reserva.idReserva}
                  className="w-full py-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between px-6">
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                      <div className="col-span-2 md:col-span-1">
                        <h3 className="font-semibold text-foreground">
                          {reserva.garage?.titulo ?? "Garage"}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{reserva.garage?.direccion}</span>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">
                              {formatDate(reserva.fechaDesde)}
                            </p>
                            {reserva.fechaDesde !== reserva.fechaHasta && (
                              <p className="text-xs text-muted-foreground">
                                hasta {formatDate(reserva.fechaHasta)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">
                              {reserva.horaDesde}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              a {reserva.horaHasta}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyle(
                            estado
                          )}`}
                        >
                          {getStatusLabel(estado)}
                        </span>
                      </div>
                    </div>

                    {mostrarBotones && (
                      <div className="flex gap-2 ml-4 items-center">
                        <Button
                          size="sm"
                          onClick={() => handleConfirmar(reserva.idReserva)}
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          Confirmar
                        </Button>
                        <button
                          onClick={() => handleModificar(reserva.idReserva)}
                          className="text-cyan-500 hover:text-cyan-700 font-medium text-sm transition-colors"
                        >
                          Modificar
                        </button>
                        <button
                          onClick={() => handleCancelar(reserva.idReserva)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tienes reservas aún</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
