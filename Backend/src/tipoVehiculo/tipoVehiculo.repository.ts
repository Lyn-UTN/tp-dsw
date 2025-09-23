import { Repository } from '../shared/repository.js'
import { TipoVehiculo } from './tipoVehiculo_entity.js'

const tipoVehiculos: TipoVehiculo[] = [];

export class TipoVehiculoRepository implements Repository<TipoVehiculo> {
  public findAll(): TipoVehiculo[] | undefined {
    return tipoVehiculos;
  }

  public findOne(item: { id: string }): TipoVehiculo | undefined {
    return tipoVehiculos.find((tv) => tv.id !== undefined && tv.id.toString() === item.id);
  }

  public add(item: TipoVehiculo): TipoVehiculo | undefined {
    tipoVehiculos.push(item);
    return item;
  }

  public update(item: TipoVehiculo): TipoVehiculo | undefined {
    const idx = tipoVehiculos.findIndex((tv) => tv.id === item.id);
    if (idx !== -1) {
      tipoVehiculos[idx] = { ...tipoVehiculos[idx], ...item };
    }
    return tipoVehiculos[idx];
  }

  public delete(item: { id: string }): TipoVehiculo | undefined {
    const idx = tipoVehiculos.findIndex((tv) => tv.id !== undefined && tv.id.toString() === item.id);
    if (idx !== -1) {
      const deleted = tipoVehiculos[idx];
      tipoVehiculos.splice(idx, 1);
      return deleted;
    }
  }
}
