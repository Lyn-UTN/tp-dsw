import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Vehiculo } from "../vehiculo/vehiculo_entity.js";
import { Reserva } from "../reserva/reserva_entity.js";
//import { BaseEntity } from "@mikro-orm/core";
// import { Garage } from '../garage/garage_entity.js';

@Entity()
export class Cliente {
  @PrimaryKey()
  idCliente!: number; //ATENCION! --> No estamos usando el BaseEntity, fijense que lo importo peor habria que usarlo con un extends a la hora de exportar la clase.

  @Property()
  nombre!: string;

  @Property()
  apellido!: string;

  @Property()
  tipoDocumento!: string;

  @Property({ nullable: true })
  numeroDocumento?: number;

  @Property()
  telefono!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ nullable: true })
  licenciaConducir?: string;

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.cliente)
  vehiculos = new Collection<Vehiculo>(this);

  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas = new Collection<Reserva>(this);

  // a implementar para el feedback
  /*@ManyToMany(()=> Garage, garage => garage.clientes)
  garages = new Collection<Garage>(this);*/
}
