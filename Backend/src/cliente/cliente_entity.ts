import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Vehiculo } from '../vehiculo/vehiculo_entity';

@Entity()
export class Cliente {
  @PrimaryKey()
  idCliente!: number;

  @Property()
  nombre!: string;

  @Property()
  apellido!: string;

  @Property()
  tipoDocumento!: string;

  @Property()
  documento!: number;

  @Property()
  telefono!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  licenciaConducir!: string;

  @OneToMany(()=> Vehiculo, vehiculo => vehiculo.cliente)
  vehiculos = new Collection<Vehiculo>(this);
}
