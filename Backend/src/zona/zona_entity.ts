import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Collection,
} from '@mikro-orm/core';
import { Garage } from '../garage/garage_entity.js';

export enum NombreZona {
  CENTRO = 'Centro',
  PICHINCHA = 'Pichincha',
  ECHESORTU = 'Echesortu',
  FISHERTON = 'Fisherton',
  BARRIO_MARTIN = 'Barrio Martin',
  ALBERDI = 'Alberdi',
  REPUBLICA_DE_LA_SEXTA = 'Republica de la Sexta',
}

@Entity()
export class Zona {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  nombreZona!: NombreZona;

  @OneToMany(() => Garage, (garage) => garage.zona)
  garages = new Collection<Garage>(this);
}
