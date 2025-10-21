import api from "./axiosConfig";

export interface TipoVehiculo {
  idTipoVehiculo?: number;
  descTipoVehiculo: string;
}

export const getTipoVehiculos = async () => {
  const response = await api.get("/tipoVehiculo");
  return response.data;
};

export const gettipoVehiculoById = async () => {
  const response = await api.get("/tipoVehiculo/id");
  return response.data;
};

export const createTipoVehiculo = async (tipoVehiculoData: TipoVehiculo) => {
  try {
    const response = await api.post("api/tipoVehiculo", tipoVehiculoData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error al crear tipoVehiculo: ", error.message);
    } else {
      console.error("error al crear tipoVehiculo: ", error);
    }
  }
};

export const deleteTipoVehiculo = async (idTipoVehiculo: number) => {
  try {
    const response = await api.delete(`/tipoVehiculo/${idTipoVehiculo}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al eliminar tipoVehiculo:", error.message);
    } else {
      console.error("Error al eliminar tipoVehiculo:", error);
    }
    throw error;
  }
};

export const updateTipoVehiculo = async (
  idTipoVehiculo: number,
  tipoVehiculoData: TipoVehiculo
) => {
  try {
    const response = await api.put(
      `/tipoVehiculo/${idTipoVehiculo}`,
      tipoVehiculoData
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error al actualizar tipoVehiculo: ", error.message);
    } else {
      console.error("error al actualizar tipoVehiculo: ", error);
    }
  }
};
