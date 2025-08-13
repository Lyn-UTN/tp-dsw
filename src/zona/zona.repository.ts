import { Repository } from "../shared/repository.js";
import { Zona } from "./zona.entity.js";
export class ZonaRepository implements Repository<Zona, number> {
    private zonas: Zona[] = [];

    public findAll(): Zona[] | undefined {
        // obtiene zonas
        return this.zonas; 
    }

    public findOne(item: { id: number }): Zona | undefined {
    return this.zonas.find((zona) => zona.idZona === item.id)
  }
  
    public add(item: Zona): Zona | undefined {
        this.zonas.push(item)
        // a agregar una nueva zona
        return item; 
    }

    public update(item: Zona): Zona | undefined {
        //  actualizar una zona existente
        const zonaIdx = this.zonas.findIndex((zona) => zona.idZona === item.idZona)

        if (zonaIdx !== -1) {
            this.zonas[zonaIdx] = { ...this.zonas[zonaIdx], ...item }
        }
        return this.zonas[zonaIdx]
    } 
    
    public delete(item: { id: number }): Zona | undefined {
        const zonaIdx = this.zonas.findIndex((zona) => zona.idZona === item.id)

        if (zonaIdx !== -1) {
            const deletedZonas = this.zonas[zonaIdx]
            this.zonas.splice(zonaIdx, 1)
            return deletedZonas
        }
    }

}