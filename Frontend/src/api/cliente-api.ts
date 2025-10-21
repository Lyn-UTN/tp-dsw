import { api } from "./axiosConfig";

export interface Cliente {
  idCliente?: number;
  nombre: string;
  apellido: string;
  tipoDocumento?: string;
  numeroDocumento?: number;
  telefono?: string;
  email: string;
  password: string;
  licenciaConducir?: string;
}

export const getClientes = async () => {
  const response = await api.get("/clientes");
  return response.data;
};

export const getClienteById = async () => {
  const response = await api.get("/clientes/id");
  return response.data;
};

export const getClienteByEmail = async () => {
  const response = await api.get("/clientes/email");
  return response.data;
};

export const createCliente = async (clienteData: Cliente) => {
  try {
    const response = await api.post("/api/clientes", clienteData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error al crear cliente: ", error.message);
    } else {
      console.error("error al crear cliente: ", error);
    }
  }
};

export const deleteCliente = async (idCliente: number) => {
  try {
    const response = await api.delete(`/clientes/${idCliente}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al eliminar cliente:", error.message);
    } else {
      console.error("Error al eliminar cliente:", error);
    }
    throw error;
  }
};

export const updateCliente = async (
  idCliente: number,
  clienteData: Cliente
) => {
  try {
    const response = await api.put(`/clientes/${idCliente}`, clienteData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error al actualizar cliente: ", error.message);
    } else {
      console.error("error al actualizar cliente: ", error);
    }
  }
};
