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
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerCliente, loginCliente } from '@/api/auth-api';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // si es un input tipo checkbox, usamos "checked"
    const newValue =
      type === 'checkbox' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // hace las validaciones básicas
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.password
    ) {
      alert('Por favor, completá todos los campos obligatorios.');
      return;
    }

    if (formData.password !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!formData.aceptarTerminos) {
      alert('Debés aceptar los términos y condiciones.');
      return;
    }

    // se prepara el payload para la API de registro
    type RegisterPayload = {
      nombre: string;
      apellido: string;
      tipoDocumento: string;
      numeroDocumento?: number;
      telefono: string;
      email: string;
      password: string;
      licenciaConducir?: string;
    };

    const payload: RegisterPayload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      tipoDocumento: formData.tipoDocumento,
      telefono: formData.telefono,
      email: formData.email,
      password: formData.password,
    };

    if (formData.numeroDocumento) {
      const n = Number(formData.numeroDocumento);
      if (!Number.isNaN(n)) payload.numeroDocumento = n;
    }

    try {
      // Usamos la nueva API de auth
      const res = await registerCliente(payload);
      console.log('Register response:', res);
      //loguea automaticamente al registrrse:
      try {
        const login = await loginCliente(formData.email, formData.password);
        localStorage.setItem('token', login.token);
        localStorage.setItem('cliente', JSON.stringify(login.cliente));
        // redirigir al home
        navigate('/home');
      } catch (loginErr) {
        console.warn(
          'Registro OK pero no se pudo loguear automáticamente:',
          loginErr
        );
        alert('Cuenta creada. Por favor, iniciá sesión.');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar el usuario.');
    }
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Nombre
                    </label>
                    <Input
                      name="nombre"
                      type="text"
                      placeholder="Juan"
                      className="w-full"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Apellido
                    </label>
                    <Input
                      name="apellido"
                      type="text"
                      placeholder="Pérez"
                      className="w-full"
                      value={formData.apellido}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Tipo de documento
                    </label>
                    <select
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
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
                      name="numeroDocumento"
                      type="number"
                      placeholder="12345678"
                      className="w-full"
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Teléfono
                    </label>
                    <Input
                      name="telefono"
                      type="tel"
                      placeholder="+54 9 341 123-4567"
                      className="w-full"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Correo electrónico
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Contraseña
                    </label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pr-10"
                        value={formData.password}
                        onChange={handleChange}
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
                        name="confirmarPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pr-10"
                        value={formData.confirmarPassword}
                        onChange={handleChange}
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
                      name="aceptarTerminos"
                      type="checkbox"
                      className="mt-1 rounded border-border"
                      checked={formData.aceptarTerminos}
                      onChange={handleChange}
                    />
                    <span className="text-muted-foreground">
                      Acepto los{' '}
                      <Link
                        to="/NotFound"
                        className="text-primary hover:underline"
                      >
                        términos y condiciones
                      </Link>{' '}
                      y la{' '}
                      <Link
                        to="/NotFound"
                        className="text-primary hover:underline"
                      >
                        política de privacidad
                      </Link>
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
                      to="/"
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
