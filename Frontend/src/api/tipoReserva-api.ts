import { api } from './axiosConfig';

export interface TipoReservaDto {
  idtiporeserva: number;
  descTipoReserva: 'xDia' | 'xMes' | 'xHora';
}

//  esto trae a todos los tipos de reserva
export async function getAllTiposReserva(): Promise<TipoReservaDto[]> {
  try {
    const res = await api.get<{ data: TipoReservaDto[] }>('/tipoReserva');
    return res.data.data;
  } catch (error) {
    console.error('Error al obtener tipos de reserva:', error);
    throw error;
  }
}
