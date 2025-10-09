
type estadoReserva = "Confirmada" | "En espera" ;


export type Reserva = {

    fechaDesde: Date;
    fechaHasta: Date;
    nroReserva: number;
    estadoReserva:  estadoReserva;

    
}