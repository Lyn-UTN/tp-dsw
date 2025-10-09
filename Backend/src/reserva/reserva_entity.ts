import { Entity, PrimaryKey, Property, ManyToOne, Rel } from "@mikro-orm/core"
import { Tiporeserva } from "../tipoReserva/tipoReserva_entity"

export type EstadoRes = "pendiente" | "confirmada" | "cancelada"

@Entity()
export class Reserva {
  @PrimaryKey()
  idReserva!: number

  @Property()
  fechaReserva!: Date

  @Property()
  fechaDesde!: Date

  @Property()
  fechaHasta!: Date

  @Property()
  horaDesde!: string

  @Property()
  horaHasta!: string

  @Property()
  estadoRes!: EstadoRes

  @ManyToOne(() => Tiporeserva, { nullable: false })
  tipoReserva!: Rel<Tiporeserva>
}