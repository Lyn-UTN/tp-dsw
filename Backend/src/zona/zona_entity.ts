import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Zona {
  @PrimaryKey()
  id!: number

  @Property()
  nombreZona!: string
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