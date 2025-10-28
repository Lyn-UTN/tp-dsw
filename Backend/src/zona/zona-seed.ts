import { Zona, NombreZona } from "./zona_entity.js";
import { orm } from "../shared/orm.js";

export async function seedZonas() {
  const em = orm.em.fork();
  const count = await em.count(Zona, {});

  if (count === 0) {
    const zonasPorDefecto = [
      { nombreZona: NombreZona.CENTRO },
      { nombreZona: NombreZona.PICHINCHA },
      { nombreZona: NombreZona.ECHESORTU },
      { nombreZona: NombreZona.FISHERTON },
      { nombreZona: NombreZona.BARRIO_MARTIN },
      { nombreZona: NombreZona.ALBERDI },
      { nombreZona: NombreZona.REPUBLICA_DE_LA_SEXTA },
    ];

    for (const zona of zonasPorDefecto) {
      const nuevaZona = em.create(Zona, zona);
      em.persist(nuevaZona);
    }

    await em.flush();
    console.log("Zonas precargadas correctamente");
  }
}
