"use client";

import { useEffect, useState } from "react";
import { getAllGarages, searchGaragesByDireccion } from "@/api/garage-api";
import type { GarageDto } from "@/api/garage-api";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface GarageListProps {
  searchQuery: string;
  vehicleTypeFilter: string[];
  onVehicleTypeChange: (types: string[]) => void;
}

export function GarageList({
  searchQuery,
  vehicleTypeFilter,
  onVehicleTypeChange,
}: GarageListProps) {
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
        console.error("Error cargando garages:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGarages();
  }, [searchQuery]);

  const filteredGarages =
    vehicleTypeFilter.length > 0
      ? garages.filter((g) => {
          const tipoLower = g.tipoGarage.toLowerCase();
          return vehicleTypeFilter.some((filter) =>
            tipoLower.includes(filter.toLowerCase())
          );
        })
      : garages;

  const handleCheckboxChange = (type: string) => {
    if (type === "todos") {
      // Si se selecciona "Todos", limpiar todos los filtros
      onVehicleTypeChange([]);
    } else {
      // Si se selecciona un tipo específico
      if (vehicleTypeFilter.includes(type)) {
        // Si ya está seleccionado, quitarlo
        onVehicleTypeChange(vehicleTypeFilter.filter((t) => t !== type));
      } else {
        // Si no está seleccionado, agregarlo
        onVehicleTypeChange([...vehicleTypeFilter, type]);
      }
    }
  };

  if (loading)
    return (
      <p className="text-center mt-8 text-muted-foreground">
        Cargando garages...
      </p>
    );

  return (
    <div className="flex gap-8 mt-12 mb-12">
      <aside className="w-64 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          <h3 className="text-lg font-semibold mb-4">Tipo de Vehículo</h3>
          <div className="space-y-3">
            {/* Checkbox para "Todos" */}
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                checked={vehicleTypeFilter.length === 0}
                onChange={() => handleCheckboxChange("todos")}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm">Todos</span>
            </label>

            {/* Checkbox para "Auto" */}
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                checked={vehicleTypeFilter.includes("auto")}
                onChange={() => handleCheckboxChange("auto")}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm">Auto</span>
            </label>

            {/* Checkbox para "Moto" */}
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                checked={vehicleTypeFilter.includes("moto")}
                onChange={() => handleCheckboxChange("moto")}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm">Moto</span>
            </label>

            {/* Checkbox para "Camioneta" */}
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                checked={vehicleTypeFilter.includes("camioneta")}
                onChange={() => handleCheckboxChange("camioneta")}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm">Camioneta</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Contenido principal con garages */}
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Garages Disponibles</h2>
          <p className="text-muted-foreground mt-1">
            {filteredGarages.length}{" "}
            {filteredGarages.length === 1
              ? "garage encontrado"
              : "garages encontrados"}
          </p>
        </div>

        {filteredGarages.length === 0 ? (
          <p className="text-center mt-8 text-muted-foreground">
            No se encontraron garages con los filtros seleccionados.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGarages.map((g) => (
              <Card
                key={g.idGarage}
                className="p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{g.titulo}</h3>
                <p className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  {g.direccion}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tipo: {g.tipoGarage}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estado: {g.estado}
                </p>
                {g.zona && (
                  <p className="text-sm text-muted-foreground">
                    Zona: {g.zona.nombre}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
