import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core'
import { Garage } from '../garage/garage_entity.js'

export type NombreZona = "Centro" | "Norte" | "Sur" | "Este" | "Oeste"

@Entity()
export class Zona {
  @PrimaryKey()
  id!: number

  @Property({ nullable: false })
  nombreZona!: NombreZona

  @OneToMany(() => Garage, garage => garage.zona)
  garages = new Collection<Garage>(this)
}
