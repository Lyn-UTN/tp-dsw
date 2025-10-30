// src/api/auth-api.ts
import axios from "axios";

// El backend monta las rutas de autenticación en el root (/auth),
// mientras que el resto de la API está en /api. Usamos un cliente
// separado para las rutas de auth que apuntan al root del servidor.
const authApi = axios.create({ baseURL: "http://localhost:3000" });

interface ClienteLogin {
  idCliente: number;
  nombre: string;
  apellido: string;
  email: string;
}

interface LoginResponse {
  message: string;
  token: string;
  cliente: ClienteLogin;
}

// Función para login
export const loginCliente = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await authApi.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
    console.error("Error al iniciar sesión:", error);
    throw new Error("Error desconocido al iniciar sesión");
  }
};

// Función para registrar cliente
export const registerCliente = async (data: {
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento?: number;
  telefono: string;
  email: string;
  password: string;
  licenciaConducir?: string;
}) => {
  try {
    const response = await authApi.post<{ message: string }>(
      "/auth/register",
      data
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al registrar cliente:", error.message);
      throw error;
    }
    console.error("Error al registrar cliente:", error);
    throw new Error("Error desconocido al registrar cliente");
  }
};

// Función para obtener perfil (ruta protegida)
export const getPerfil = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token");
    const response = await authApi.get<{ message: string; user: unknown }>(
      "/auth/perfil",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al obtener perfil:", error.message);
      throw error;
    }
    console.error("Error al obtener perfil:", error);
    throw new Error("Error desconocido al obtener perfil");
  }
};
