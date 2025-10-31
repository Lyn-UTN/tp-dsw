'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);

  useEffect(() => {
    const clienteStr = localStorage.getItem('cliente');

    if (clienteStr) {
      try {
        const cliente = JSON.parse(clienteStr) as {
          nombre?: string;
          apellido?: string;
        };
        if (cliente?.nombre) {
          setNombreUsuario(cliente.nombre);
          return;
        }
      } catch (err) {
        console.error('Error parseando cliente desde localStorage:', err);
      }
    }
  }, []);

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

          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-2 bg-transparent"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              {/*aca se podría agregar un cerrar sesión que anule el token y redirija al login*/}
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Ayuda</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-2 bg-transparent"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/misreservas" className="cursor-pointer">
                    Mis Reservas
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {nombreUsuario && (
              <p className="text-sm text-muted-foreground mt-1">
                Hola, {nombreUsuario}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
