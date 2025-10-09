"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Buscá",
    description: "Ingresá tu ubicación y las fechas que necesitás",
    image: "/search-location-map-rosario.jpg",
  },
  {
    number: "2",
    title: "Reservá",
    description: "Elegí el garage que mejor se adapte a tus necesidades",
    image: "/garage-parking-space-selection.jpg",
  },
  {
    number: "3",
    title: "Estacioná",
    description: "Accedé a tu garage con tu código único y estacioná tranquilo",
    image: "/car-parking-in-garage.jpg",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Tres simples pasos para encontrar tu garage ideal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-sm overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-balance">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white px-8"
          >
            Comenzar ahora
          </Button>
        </div>
      </div>
    </section>
  );
}
