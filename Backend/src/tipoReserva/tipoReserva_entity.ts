import {
  Entity,
  Property,
  PrimaryKey,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { Reserva } from "../reserva/reserva_entity.js";

export type DescTipoReserva = "xDia" | "xMes" | "xHora";

@Entity()
export class Tiporeserva {
  @PrimaryKey({ autoincrement: true })
  idtiporeserva!: number;

  @Property({ nullable: false })
  descTipoReserva!: DescTipoReserva;

  @OneToMany(() => Reserva, (reserva) => reserva.tipoReserva)
  reservas = new Collection<Reserva>(this);
}

// puede no ir "autoincrement: true"

// yo creo que no hace falta usar lo del type, proque no obliga a usar any
// en el seed y creo que puede tener alguna vulnerabilidad, aca no pasa nada, pero como para saber
