import { api } from "./axiosConfig";

export interface ReservaPayload {
  fechaReserva: string; // ISO
  fechaDesde: string; // ISO
  fechaHasta: string; // ISO
  horaDesde: string;
  horaHasta: string;
  estadoRes: string;
  tipoReserva: number; // idtiporeserva
  cliente: number; // idCliente
  garage: number; // idGarage
}

export async function createReserva(payload: ReservaPayload) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const res = await api.post(`/reserva`, payload, { headers });
  return res.data;
}

export async function getReservas() {
  const res = await api.get(`/reserva`);
  return res.data;
}

export async function getReservaById(id: number) {
  const res = await api.get(`/reserva/${id}`);
  return res.data;
}

export async function updateReserva(
  id: number,
  payload: Partial<ReservaPayload>
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const res = await api.put(`/reserva/${id}`, payload, { headers });
  return res.data;
}

export async function deleteReserva(id: number) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const res = await api.delete(`/reserva/${id}`, { headers });
  return res.data;
}
