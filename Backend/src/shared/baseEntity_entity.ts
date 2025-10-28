import { PrimaryKey } from "@mikro-orm/core"; /* carpeta en la cual se comparten atributos entre las entidades*/

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number;
}
//no la vamos a usar al final.
