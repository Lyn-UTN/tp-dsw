import { Entity, OneToMany, PrimaryKey, Property,Collection} from '@mikro-orm/core'
import { Garage } from '../garage/garage_entity.js';

@Entity()
export class Zona {
  @PrimaryKey()
  id!: number

  @Property()
  nombreZona!: string

  @OneToMany(()=> Garage, garage => garage.zona)
  garages = new Collection<Garage>(this);
}



/*import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

Entity()
type nombreZona = "Centro" | "Norte" | "Sur" | "Este" | "Oeste"

export class Zona {
  constructor(
    public idZona: number,
    public nombreZona: nombreZona,
){}
}

export interface ZonaRow {
  idZona: number;
  nombreZona: string;
*/ 