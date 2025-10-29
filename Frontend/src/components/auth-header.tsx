'use client';

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-NDYPUS6grAG1OMP5A4t3DneJC0eRJ1.png"
              alt="Airbng"
              className="h-10 w-auto"
            />
          </Link>

          {/* Help Button */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-2 bg-transparent hover:bg-muted"
            title="Ayuda"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
