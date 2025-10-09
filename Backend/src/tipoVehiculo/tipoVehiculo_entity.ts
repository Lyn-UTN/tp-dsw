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
import { Vehiculo } from '../vehiculo/vehiculo_entity.js';
import { BaseEntity } from '../shared/baseEntity_entity.js';
@Entity()
export class TipoVehiculo extends BaseEntity {
    @Property({nullable: false})
    descTipoVehiculo!: string

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.tipoVehiculo, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
    vehiculos = new Collection<Vehiculo>(this);
}