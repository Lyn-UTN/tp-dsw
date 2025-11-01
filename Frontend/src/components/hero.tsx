"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RotatingText } from "@/components/ui/rotating-text";

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [direccion, setDireccion] = useState("");

  const handleSearch = () => {
    onSearch(direccion.trim());
  };

  return (
    <section className="relative bg-gradient-to-b from-primary-light to-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Encontrá el garage{" "}
            <RotatingText
              words={["perfecto", "más cercano", "seguro", "ideal"]}
              className="text-primary"
            />{" "}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Alquilá garages por hora, día o mes en toda la ciudad
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-4xl mx-auto p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Ubicación (Zona)
              </label>
              <Input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="¿Dónde necesitás estacionar?"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Fecha de entrada
              </label>
              <Input type="date" className="w-full" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Fecha de salida
              </label>
              <Input type="date" className="w-full" />
            </div>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full mt-6 bg-primary hover:bg-primary-hover text-white h-12 text-base font-semibold"
          >
            <Search className="mr-2 h-5 w-5" />
            Buscar garages
          </Button>
        </Card>
      </div>
    </section>
  );
}
