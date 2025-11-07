"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clienteStr = localStorage.getItem("cliente");

    if (clienteStr) {
      try {
        const cliente = JSON.parse(clienteStr) as {
          nombre?: string;
          apellido?: string;
        };
        if (cliente?.nombre) {
          setNombreUsuario(cliente.nombre);
        }
      } catch (err) {
        console.error("Error parseando cliente desde localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cliente");
    navigate("/");
  };

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
            {/* Menú de opciones (Ayuda, etc.) */}
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

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/Notfound" className="cursor-pointer">
                    Ayuda
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menú de usuario */}
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

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
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
