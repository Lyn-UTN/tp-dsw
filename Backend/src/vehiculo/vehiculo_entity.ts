import { Entity, Property, PrimaryKey, ManyToOne} from "@mikro-orm/core";
import{Cliente } from "../cliente/cliente_entity"
import { TipoVehiculo } from "../tipoVehiculo/tipoVehiculo_entity";


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
