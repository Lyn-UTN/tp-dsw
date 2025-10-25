'use client';

import { useEffect, useState } from 'react';
import { getAllGarages, searchGaragesByDireccion } from '@/api/garage-api';
import type { GarageDto } from '@/api/garage-api';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface GarageListProps {
  searchQuery: string;
}

export function GarageList({ searchQuery }: GarageListProps) {
  const [garages, setGarages] = useState<GarageDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGarages() {
      setLoading(true);
      try {
        let data: GarageDto[];
        if (searchQuery) {
          data = await searchGaragesByDireccion(searchQuery);
        } else {
          data = await getAllGarages();
        }
        setGarages(data);
      } catch (error) {
        console.error('Error cargando garages:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGarages();
  }, [searchQuery]);

  if (loading)
    return (
      <p className="text-center mt-8 text-muted-foreground">
        Cargando garages...
      </p>
    );

  if (garages.length === 0)
    return (
      <p className="text-center mt-8 text-muted-foreground">
        No se encontraron garages.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {garages.map((g) => (
        <Card
          key={g.idGarage}
          className="p-6 shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">{g.titulo}</h3>
          <p className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            {g.direccion}
          </p>
          <p className="text-sm text-muted-foreground">Tipo: {g.tipoGarage}</p>
          <p className="text-sm text-muted-foreground">Estado: {g.estado}</p>
          {g.zona && (
            <p className="text-sm text-muted-foreground">
              Zona: {g.zona.nombre}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
