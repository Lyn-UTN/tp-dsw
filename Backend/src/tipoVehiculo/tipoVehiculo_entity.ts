import {Entity, Property, Cascade , OneToMany, Collection, PrimaryKey} from '@mikro-orm/core';
import { Vehiculo } from '../vehiculo/vehiculo_entity.js'

export type DescTipoVehiculo = "auto" | "moto" | "camioneta"

@Entity()
export class TipoVehiculo {

    @PrimaryKey()
    idTipoVehiculo!: Number

    @Property({nullable: false})
    desctipoVehiculo!: DescTipoVehiculo

    @OneToMany(() => Vehiculo, vehiculo => vehiculo.tipoVehiculo)
    vehiculos = new Collection<Vehiculo>(this);


}