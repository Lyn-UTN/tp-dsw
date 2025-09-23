import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

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
}
