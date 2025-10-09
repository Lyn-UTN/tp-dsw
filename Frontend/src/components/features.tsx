"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, MapPin, CreditCard } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Ubicaciones estratégicas",
    description: "Garages en toda Rosario, cerca de donde más los necesitás",
  },
  {
    icon: Clock,
    title: "Reservá al instante",
    description: "Confirmación inmediata y acceso rápido a tu garage",
  },
  {
    icon: Shield,
    title: "Seguro y confiable",
    description: "Todos los garages verificados con seguro incluido",
  },
  {
    icon: CreditCard,
    title: "Precios transparentes",
    description: "Sin costos ocultos. Pagá solo lo que usás",
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir Airbng?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            La forma más fácil y segura de encontrar estacionamiento en Rosario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-balance">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
