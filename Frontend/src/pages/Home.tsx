'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/como-funciona';
import { Footer } from '@/components/footer';
import { GarageList } from '@/components/garage-list';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onSearch={setSearchQuery} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GarageList searchQuery={searchQuery} />
        </div>
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
