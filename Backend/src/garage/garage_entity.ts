import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { Zona } from '../zona/zona_entity.js';
import { Reserva } from '../reserva/reserva_entity.js';
// import {Cliente} from "../cliente/cliente_entity";

@Entity()
export class Garage {
  @PrimaryKey()
  idGarage!: number;

  @Property()
  titulo!: string;

  @Property()
  direccion!: string;

  @Property()
  tipoGarage!: string;

  @Property()
  mailDueno!: string;

  @Property()
  estado!: string;

  @Property()
  precio!: number;

  @Property()
  descripcion!: string;

  @Property()
  imagen!: string;

  @ManyToOne(() => Zona)
  zona!: Zona;

  @OneToMany(() => Reserva, (reserva) => reserva.garage)
  reservas = new Collection<Reserva>(this);

  //para implementar feedback:
  /* @ManyToMany(()=> Cliente, cliente => cliente.garages)
    clientes= new Collection<Cliente>(this);*/
}
