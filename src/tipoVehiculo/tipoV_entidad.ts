import crypto from 'node:crypto';

export class TipoVehiculo {
  public id_TipoVehiculo = crypto.randomUUID();
  public nombre_TipoVehiculo: string = '';
};