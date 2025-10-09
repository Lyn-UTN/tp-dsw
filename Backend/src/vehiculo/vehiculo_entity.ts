import { Entity, Property, PrimaryKey, ManyToOne} from "@mikro-orm/core";
import{Cliente } from "../cliente/cliente_entity.js"
import { TipoVehiculo } from "../tipoVehiculo/tipoVehiculo_entity.js";


@Entity()
export class Vehiculo {

    @PrimaryKey()
    idVehiculo!: number;

    @Property()
    patente!: string;

    @Property()
    marca!: string;

    @ManyToOne(()=> Cliente)
    cliente!: Cliente;

    @ManyToOne(()=> TipoVehiculo)
    tipoVehiculo!: TipoVehiculo;

}
