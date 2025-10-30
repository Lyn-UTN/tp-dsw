"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { GarageList } from "@/components/garage-list";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string[]>([]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onSearch={setSearchQuery} />
        <div className="border-t border-gray-200 my-8"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GarageList
            searchQuery={searchQuery}
            vehicleTypeFilter={vehicleTypeFilter}
            onVehicleTypeChange={setVehicleTypeFilter}
          />
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
}
