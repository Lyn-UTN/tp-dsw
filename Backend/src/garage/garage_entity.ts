
import {Entity, Property, PrimaryKey, ManyToOne} from "@mikro-orm/core";
import { Zona } from "../zona/zona_entity.js";
// import {Cliente} from "../cliente/cliente_entity";


@Entity()
export class Garage{

    @PrimaryKey()
    idGarage!: Number;

    @Property()
    titulo!: string;

    @Property()
    direccion!: string

    @Property()
    tipoGarage!: string;

    @Property()
    mailDueno!: string;

    @Property()
    estado!: string;

    @ManyToOne(()=> Zona)
    zona!: Zona;

    //para implementar feedback:
   /* @ManyToMany(()=> Cliente, cliente => cliente.garages)
    clientes= new Collection<Cliente>(this);*/

}