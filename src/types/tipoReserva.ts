
type estadoReserva = "xHora" | "xdia" | "xmes";


export type tipoReserva = {
    id_TipoReserva: number;
    tipoReserva: estadoReserva;
    descTipoReserva: string;
};
