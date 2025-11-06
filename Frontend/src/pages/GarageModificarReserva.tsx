'use client';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGarageById } from '@/api/garage-api';
import { getReservaById, updateReserva } from '@/api/reserva-api';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, MapPin, Star, Shield, Car } from 'lucide-react';
import type { GarageDto } from '@/api/garage-api';

export default function GarageModificarReserva() {
  const { id } = useParams(); // id de la reserva
  const navigate = useNavigate();

  const [garage, setGarage] = useState<GarageDto | null>(null);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>();
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  // cargar reserva y garage
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await getReservaById(Number(id));
        const reserva = (res && (res.data ?? res)) || res;

        const fechaDesde = reserva?.fechaDesde ?? reserva?.fecha_desde;
        const fechaHasta = reserva?.fechaHasta ?? reserva?.fecha_hasta;
        const horaDesde = reserva?.horaDesde ?? reserva?.hora_desde ?? '';
        const horaHasta = reserva?.horaHasta ?? reserva?.hora_hasta ?? '';

        if (fechaDesde) {
          setDateRange({
            from: new Date(fechaDesde),
            to: fechaHasta ? new Date(fechaHasta) : undefined,
          });
        }
        setSelectedStartTime(horaDesde);
        setSelectedEndTime(horaHasta);

        // obtiene id del garage
        const garageId = reserva?.garage?.idGarage ?? reserva?.garage ?? null;
        if (garageId) {
          const g = await getGarageById(Number(garageId));
          setGarage(g);
        }
      } catch (err) {
        console.error('Error al cargar la reserva:', err);
        alert('No se pudo cargar la reserva para editar');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
      hours.push(`${i.toString().padStart(2, '0')}:30`);
    }
    return hours;
  };

  const availableHours = generateHours();

  const handleDateSelect = (
    date: Date | { from: Date; to?: Date } | undefined
  ) => {
    if (!date) return;
    if ('from' in date) {
      setDateRange(date);
      if (!date.to || date.from.toDateString() === date.to.toDateString()) {
        setShowTimeSelector(true);
      }
    } else {
      setDateRange({ from: date, to: date });
      setShowTimeSelector(true);
    }
  };

  const handleTimeConfirm = () => {
    setShowTimeSelector(false);
  };

  if (loading)
    return <div className="text-center py-20 text-lg">Cargando...</div>;

  if (!garage)
    return (
      <div className="text-center py-20 text-lg">Garage no encontrado</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* foto de garage */}
          <Card className="overflow-hidden shadow-lg mb-8">
            {garage?.imagen ? (
              <img
                src={garage.imagen}
                alt={garage.titulo}
                className="w-full h-80 object-cover"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                Imagen no disponible
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* info principal */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {garage.titulo}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{garage.direccion}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">(124 reseñas)</span>
                  </div>
                </div>
              </div>

              <Card className="p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Características</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-light p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Seguridad 24/7</p>
                      <p className="text-sm text-muted-foreground">
                        Vigilancia permanente
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-light p-2 rounded-lg">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Espacio amplio</p>
                      <p className="text-sm text-muted-foreground">
                        Para todo tipo de vehículos
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {garage.descripcion}
                </p>
              </Card>
            </div>

            {/* seleccion de hs o dias para la modificacion */}
            <div className="lg:col-span-1">
              <Card className="p-6 shadow-lg sticky top-24">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Precios</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Por hora</span>
                      <span className="text-lg font-bold text-primary">
                        ${garage.precio}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Seleccionar fechas
                  </h3>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary-hover text-white h-12 text-base font-semibold"
                  disabled={!dateRange?.from}
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      navigate('/login');
                      return;
                    }

                    const clienteStr = localStorage.getItem('cliente');
                    const clienteObj = clienteStr
                      ? JSON.parse(clienteStr)
                      : null;

                    if (!clienteObj?.idCliente) {
                      alert('Debés iniciar sesión con una cuenta válida');
                      navigate('/login');
                      return;
                    }

                    if (!dateRange?.from) {
                      alert('Seleccioná una fecha válida antes de modificar');
                      return;
                    }

                    const payload = {
                      fechaReserva: new Date().toISOString(),
                      fechaDesde: dateRange?.from.toISOString(),
                      fechaHasta: (
                        dateRange.to ?? dateRange.from
                      ).toISOString(),
                      horaDesde: selectedStartTime || '00:00',
                      horaHasta: selectedEndTime || '23:59',
                      estadoRes: 'pendiente',
                      tipoReserva: 1,
                      cliente: clienteObj.idCliente,
                      garage: garage.idGarage,
                    };

                    try {
                      await updateReserva(Number(id), payload);
                      alert('Reserva modificada correctamente');
                      navigate('/misreservas');
                    } catch (err) {
                      console.error('Error modificando reserva', err);
                      alert('No se pudo modificar la reserva');
                    }
                  }}
                >
                  Modificar reserva
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showTimeSelector} onOpenChange={setShowTimeSelector}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Seleccionar horario
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Hora de inicio
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {availableHours.map((hour) => (
                  <Button
                    key={`start-${hour}`}
                    variant={selectedStartTime === hour ? 'default' : 'outline'}
                    className={`h-10 ${
                      selectedStartTime === hour
                        ? 'bg-primary hover:bg-primary-hover text-white'
                        : ''
                    }`}
                    onClick={() => setSelectedStartTime(hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </div>

            {selectedStartTime && (
              <div>
                <label className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Hora de fin (opcional)
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {availableHours
                    .filter((hour) => hour > selectedStartTime)
                    .map((hour) => (
                      <Button
                        key={`end-${hour}`}
                        variant={
                          selectedEndTime === hour ? 'default' : 'outline'
                        }
                        className={`h-10 ${
                          selectedEndTime === hour
                            ? 'bg-primary hover:bg-primary-hover text-white'
                            : ''
                        }`}
                        onClick={() => setSelectedEndTime(hour)}
                      >
                        {hour}
                      </Button>
                    ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setShowTimeSelector(false);
                  setSelectedStartTime('');
                  setSelectedEndTime('');
                }}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary-hover text-white"
                onClick={handleTimeConfirm}
                disabled={!selectedStartTime}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
