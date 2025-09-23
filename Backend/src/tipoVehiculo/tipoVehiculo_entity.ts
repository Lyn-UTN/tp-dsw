 import {
    Entity,
    Property,
    ManyToMany,
    Cascade,
    OneToMany,
    ManyToOne,
    Rel,
    Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity_entity.js';

@Entity()
export class TipoVehiculo extends BaseEntity {
    @Property({nullable: false})
    descTipoVehiculo!: string

    /*@OneToMany(() => vehiculo, (vehiculo) => vehiculo.tipoVehiculo,{// hay q hacer la crud de vehiculo
    cascade: [Cascade.ALL]
    })
    vehiculos = new Collection<vehiculo>(this); */
}