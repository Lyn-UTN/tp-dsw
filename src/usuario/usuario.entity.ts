export class Usuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public tipoDocumento: string,
        public documento: number,
        public telefono: string,
        public email: string,
        public password: string,
    ){}
}