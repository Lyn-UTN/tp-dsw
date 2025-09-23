import { PrimaryKey } from '@mikro-orm/core' /* carpeta en la cual se comparten atributos entre las entidades*/

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number

  /* Propiedades piolas para usar en caso de necesitarlas

  @Property({ type: DateTimeType })
  createdAt? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date()

  */
}
