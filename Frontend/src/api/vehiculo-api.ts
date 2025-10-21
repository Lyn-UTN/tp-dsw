import api from "./axiosConfig";

export interface Vehiculo {
  idVehiculo?: number;
  patente: string;
  marca: string;
}

export const getVehiculos = async () => {
  const response = await api.get("/vehiculo");
  return response.data;
};

export const getVehiculoById = async () => {
  const response = await api.get("/vehiculo/id");
  return response.data;
};

export const createVehiculo = async (vehiculoData: Vehiculo) => {
  try {
    const response = await api.post("api/vehiculo", vehiculoData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error al crear vehiculo: ", error.message);
    } else {
      console.error("error al crear vehiculo: ", error);
    }
  }
};

export const deleteVehiculo = async (idvehiculo: number) => {
  try {
    const response = await api.delete(`/vehiculo/${idvehiculo}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al eliminar vehiculo:", error.message);
    } else {
      console.error("Error al eliminar vehiculo:", error);
    }
    throw error;
  }
};

export const updateVehiculo = async (
  idvehiculo: number,
  vehiculoData: Vehiculo
) => {
  try {
    const response = await api.put(`/vehiculo/${idvehiculo}`, vehiculoData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error al actualizar vehiculo: ", error.message);
    } else {
      console.error("error al actualizar vehiculo: ", error);
    }
  }
};
