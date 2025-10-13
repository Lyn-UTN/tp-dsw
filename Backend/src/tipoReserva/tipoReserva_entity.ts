import { Entity, Property, PrimaryKey, OneToMany, Collection } from '@mikro-orm/core'
import { Reserva } from "../reserva/reserva_entity.js"

export type DescTipoReserva = "xDia" | "xMes" | "xHora"

@Entity()
export class Tiporeserva {

  @PrimaryKey()
  idtiporeserva!: number

  @Property({ nullable: false })
  descTipoReserva!: DescTipoReserva

  @OneToMany(() => Reserva, reserva => reserva.tipoReserva)
  reservas = new Collection<Reserva>(this)
}