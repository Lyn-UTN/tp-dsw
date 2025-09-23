import { Usuario } from "../usuario/usuario.entity";

export class dueño extends Usuario{
    constructor(
        idUsuario: number,
        nombre: string,
        apellido: string,
        tipoDocumento: string,
        documento: number,
        telefono: string,
        email: string,
        password: string,
        public idDueño: number,
        public cuitDueño: number
    ) {
        super(idUsuario, nombre, apellido, tipoDocumento, documento, telefono, email, password);
    }
}