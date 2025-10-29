'use client';

import { useState } from 'react';
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

export default function GarageDetail() {
  const [dateRange, setDateRange] = useState<
    { from: Date; to?: Date } | undefined
  >(undefined);

  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');

  // Generar todas las horas del día
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

    // Si es un rango
    if ('from' in date) {
      setDateRange(date); // ya tiene el tipo correcto
      // Abrir selector de horas si es un solo día
      if (!date.to || date.from.toDateString() === date.to.toDateString()) {
        setShowTimeSelector(true);
      }
    } else {
      // Si es solo una fecha (modo single)
      setDateRange({ from: date, to: date });
      setShowTimeSelector(true);
    }
  };

  const handleTimeConfirm = () => {
    setShowTimeSelector(false);
    // Aquí puedes manejar la lógica de confirmación
    if (dateRange) {
      console.log('Fecha:', dateRange.from);
      console.log('Hora inicio:', selectedStartTime);
      console.log('Hora fin:', selectedEndTime);
    }
    console.log('[v0] Hora inicio:', selectedStartTime);
    console.log('[v0] Hora fin:', selectedEndTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Imagen del garage */}
          <Card className="overflow-hidden shadow-lg mb-8">
            <img
              src="/modern-garage-interior-with-parking-space.jpg"
              alt="Garage"
              className="w-full h-[400px] object-cover"
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título y ubicación */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                  Garage Céntrico - Centro de Rosario
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Av. Pellegrini 1234, Rosario, Santa Fe</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">(124 reseñas)</span>
                  </div>
                </div>
              </div>

              {/* Características */}
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

              {/* Descripción */}
              <Card className="p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Garage céntrico ubicado en pleno corazón de Rosario, a pocas
                  cuadras de la peatonal Córdoba. Ideal para quienes trabajan en
                  el centro o necesitan estacionar mientras realizan trámites.
                  Cuenta con acceso fácil, portón automático y vigilancia las 24
                  horas. El espacio es amplio y techado, perfecto para proteger
                  tu vehículo de las inclemencias del tiempo.
                </p>
              </Card>
            </div>

            {/* Panel de reserva */}
            <div className="lg:col-span-1">
              <Card className="p-6 shadow-lg sticky top-24">
                {/* Precios */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Precios</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Por hora</span>
                      <span className="text-lg font-bold text-primary">
                        $500
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Por día</span>
                      <span className="text-lg font-bold text-primary">
                        $3.000
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Por mes</span>
                      <span className="text-lg font-bold text-primary">
                        $45.000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calendario */}
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

                {/* Botón de reserva */}
                <Button
                  className="w-full bg-primary hover:bg-primary-hover text-white h-12 text-base font-semibold"
                  disabled={!dateRange?.from}
                >
                  Reservar ahora
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Dialog para seleccionar horas */}
      <Dialog open={showTimeSelector} onOpenChange={setShowTimeSelector}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Seleccionar horario
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Hora de inicio */}
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

            {/* Hora de fin (opcional) */}
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

            {/* Botones de acción */}
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
