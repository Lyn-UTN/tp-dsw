'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface Reserva {
  id: string;
  nombre: string;
  ubicacion: string;
  diaInicio: string;
  diaFin: string;
  horaInicio: string;
  horaFin: string;
  estado?: 'pendiente' | 'confirmada' | 'cancelada';
}

export default function MisReservas() {
  const reservas: Reserva[] = [
    {
      id: '1',
      nombre: 'Garage Centro',
      ubicacion: 'Av. Principal 123, Centro',
      diaInicio: '2025-12-15',
      diaFin: '2025-12-17',
      horaInicio: '09:00',
      horaFin: '18:00',
      estado: 'pendiente',
    },
    {
      id: '2',
      nombre: 'Garage Shopping',
      ubicacion: 'Shopping Mall, Planta -2',
      diaInicio: '2025-11-20',
      diaFin: '2025-11-20',
      horaInicio: '14:00',
      horaFin: '16:00',
      estado: 'pendiente',
    },
    {
      id: '3',
      nombre: 'Garage Aeropuerto',
      ubicacion: 'Aeropuerto Internacional',
      diaInicio: '2025-10-25',
      diaFin: '2025-10-28',
      horaInicio: '00:00',
      horaFin: '23:59',
      estado: 'confirmada',
    },
    {
      id: '4',
      nombre: 'Garage Nord',
      ubicacion: 'Zona Industrial Norte',
      diaInicio: '2025-09-10',
      diaFin: '2025-09-12',
      horaInicio: '08:00',
      horaFin: '20:00',
      estado: 'cancelada',
    },
  ];

  const getReservaStatus = (
    reserva: Reserva
  ): 'pendiente' | 'confirmada' | 'cancelada' => {
    if (reserva.estado) return reserva.estado;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diaFin = new Date(reserva.diaFin + 'T00:00:00');

    if (diaFin < today) {
      return 'confirmada';
    }
    return 'pendiente';
  };

  const reservasOrdenadas = [...reservas].sort((a, b) => {
    const statusA = getReservaStatus(a);
    const statusB = getReservaStatus(b);

    const statusOrder = { pendiente: 0, cancelada: 1, confirmada: 2 };
    return statusOrder[statusA] - statusOrder[statusB];
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusBadgeStyle = (
    estado: 'pendiente' | 'confirmada' | 'cancelada'
  ) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      confirmada: 'bg-green-100 text-green-800 border border-green-300',
      cancelada: 'bg-red-100 text-red-800 border border-red-300',
    };
    return styles[estado];
  };

  const getStatusLabel = (estado: 'pendiente' | 'confirmada' | 'cancelada') => {
    const labels = {
      pendiente: 'Pendiente',
      confirmada: 'Confirmada',
      cancelada: 'Cancelada',
    };
    return labels[estado];
  };

  const handleCancelar = (id: string) => {
    console.log('Cancelar reserva:', id);
  };

  const handleModificar = (id: string) => {
    console.log('Modificar reserva:', id);
  };

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
          {reservasOrdenadas.length > 0 ? (
            reservasOrdenadas.map((reserva) => {
              const estado = getReservaStatus(reserva);
              const mostrarBotones = estado === 'pendiente';

              return (
                <Card
                  key={reserva.id}
                  className="w-full py-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between px-6">
                    {/* Información de la reserva */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                      {/* Nombre y ubicación */}
                      <div className="col-span-2 md:col-span-1">
                        <h3 className="font-semibold text-foreground">
                          {reserva.nombre}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{reserva.ubicacion}</span>
                        </div>
                      </div>

                      {/* Fechas */}
                      <div className="col-span-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">
                              {formatDate(reserva.diaInicio)}
                            </p>
                            {reserva.diaInicio !== reserva.diaFin && (
                              <p className="text-xs text-muted-foreground">
                                hasta {formatDate(reserva.diaFin)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Horas */}
                      <div className="col-span-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">
                              {reserva.horaInicio}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              a {reserva.horaFin}
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
                          onClick={() => handleModificar(reserva.id)}
                        >
                          Modificar
                        </Button>
                        <button
                          onClick={() => handleCancelar(reserva.id)}
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
