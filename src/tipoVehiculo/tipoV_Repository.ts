import { Repository } from "../shared/repository.js";
import { TipoVehiculo } from "./tipoV_entidad.js";

const tipoVehiculoData: TipoVehiculo[] = [
    new TipoVehiculo()
];

//Bueno aca lo que hice fue crear un repositorio(DAO) que implemente la interfaz Repository 
// y que maneje las operaciones para la entidad TipoVehiculo.

//las promises son una forma de manejar operaciones asincrónicas en JavaScript,
// permitiendo que el código se ejecute de manera no bloqueante, osea como tarda tiempo en ejecutarse las operaciones
//de memoria, las promesas permiten que el programa siga ejecutándose mientras espera que esas operaciones se completen.

export class TipoVehiculoRepository implements Repository<TipoVehiculo>{
    public findall(): Promise<TipoVehiculo[] | undefined> {
        return Promise.resolve(tipoVehiculoData);
    }
    public findOne(id: string): Promise<TipoVehiculo | undefined> {
        const tipoVehiculo = tipoVehiculoData.find(tv => tv.id_TipoVehiculo === id);
        return Promise.resolve(tipoVehiculo);
    }
    public add(entity: TipoVehiculo): Promise<TipoVehiculo | undefined> {
        tipoVehiculoData.push(entity);
        return Promise.resolve(entity);
    }
    public update(entity: TipoVehiculo): Promise<TipoVehiculo | undefined> {
        const index = tipoVehiculoData.findIndex(tv => tv.id_TipoVehiculo === entity.id_TipoVehiculo);
        if (index !== -1) {
            tipoVehiculoData[index] = entity;
            return Promise.resolve(entity);
        }
        return Promise.resolve(undefined);
    }
    public delete(id: string): Promise<TipoVehiculo | undefined> {
        const index = tipoVehiculoData.findIndex(tv => tv.id_TipoVehiculo === id);
        if (index !== -1) {
            const deletedEntity = tipoVehiculoData.splice(index, 1)[0];
            return Promise.resolve(deletedEntity);
        }
        return Promise.resolve(undefined);
    }
}
