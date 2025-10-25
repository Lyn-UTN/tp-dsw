// src/apis/garage-api.ts
import { api } from './axiosConfig';

export interface ZonaDto {
  id: number;
  nombre?: string;
}
export interface GarageDto {
  idGarage: number;
  titulo: string;
  direccion: string;
  tipoGarage: string;
  mailDueno: string;
  estado: string;
  zona?: ZonaDto | null;
}

export async function getAllGarages(limit = 100): Promise<GarageDto[]> {
  const res = await api.get<{ data: GarageDto[] }>(`/garage`, {
    params: { limit },
  });
  return res.data.data;
}

// Buscar por dirección (usa query param 'direccion')
export async function searchGaragesByDireccion(
  direccion: string,
  limit = 100
): Promise<GarageDto[]> {
  const res = await api.get<{ data: GarageDto[] }>(`/garage`, {
    params: { direccion, limit },
  });
  return res.data.data;
}

export async function createGarage(payload: Partial<GarageDto>) {
  const res = await api.post(`/garage`, payload);
  return res.data;
}

export async function updateGarage(id: number, payload: Partial<GarageDto>) {
  const res = await api.put(`/garage/${id}`, payload);
  return res.data;
}

export async function deleteGarage(id: number) {
  const res = await api.delete(`/garage/${id}`);
  return res.data;
}
