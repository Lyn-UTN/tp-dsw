import { Usuario } from "../usuario/usuario.entity.js";
export class Cliente extends Usuario {
    constructor(
    idUsuario: number,
    nombre: string,
    apellido: string,
    tipoDocumento: string,
    documento: number,
    telefono: string,
    email: string,
    password: string,
    public idCliente: number,
    public licenciaConducir: string) {
        super(idUsuario,nombre, apellido, tipoDocumento, documento, telefono, email, password);
    }
}