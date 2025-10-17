'use client';

import { AuthHeader } from '@/components/auth-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  FileText,
  CreditCard,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    email: '',
    password: '',
    confirmarPassword: '',
    aceptarTerminos: false,
  });


  const chek
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };



  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-1 bg-gradient-to-b from-primary-light to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Creá tu cuenta
              </h1>
              <p className="text-muted-foreground text-balance">
                Empezá a alquilar garages en minutos
              </p>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Nombre
                    </label>
                    <Input type="text" placeholder="Juan" className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Apellido
                    </label>
                    <Input type="text" placeholder="Pérez" className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Tipo de documento
                    </label>
                    <select className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Seleccioná un tipo</option>
                      <option value="DNI">DNI</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="Cédula">Cédula</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      Número de documento
                    </label>
                    <Input
                      type="number"
                      placeholder="12345678"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      placeholder="+54 9 341 123-4567"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Correo electrónico
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Contraseña
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-border"
                    />
                    <span className="text-muted-foreground">
                      Acepto los{' '}
                      <a href="#" className="text-primary hover:underline">
                        términos y condiciones
                      </a>{' '}
                      y la{' '}
                      <a href="#" className="text-primary hover:underline">
                        política de privacidad
                      </a>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white h-12 text-base font-semibold"
                  >
                    Crear cuenta
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    ¿Ya tenés cuenta?{' '}
                    <Link
                      to="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Iniciá sesión
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
