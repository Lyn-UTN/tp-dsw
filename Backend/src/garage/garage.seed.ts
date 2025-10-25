import { orm } from '../shared/orm.js';
import { Garage } from './garage_entity.js';
import { Zona, NombreZona } from '../zona/zona_entity.js';

export async function seedGarages() {
  const em = orm.em.fork();
  const count = await em.count(Garage, {});

  if (count === 0) {
    // Buscar las zonas existentes por nombre (usando el enum)
    const zonas = await em.find(Zona, {});

    const getZona = (nombre: NombreZona) =>
      zonas.find((z) => z.nombreZona === nombre);

    const garagesPorDefecto = [
      {
        titulo: 'Garage Tucumán',
        direccion: 'Tucumán 1450 (Entre Corrientes y Paraguay)',
        tipoGarage: 'Para auto',
        mailDueno: 'juanperez@gmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.CENTRO),
      },
      {
        titulo: 'Garage Pichincha Parking',
        direccion: 'Ovidio Lagos 1200 (Entre Salta y Jujuy)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'maria.sosa@hotmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.PICHINCHA),
      },
      {
        titulo: 'Garage Córdoba Oeste',
        direccion: 'Av. Córdoba 3500 (Entre Cafferata y Vera Mujica)',
        tipoGarage: 'Para auto',
        mailDueno: 'carlos.rodriguez@gmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.ECHESORTU),
      },
      {
        titulo: 'Garage Fisherton Express',
        direccion: 'Av. Eva Perón 8200 (Entre Wilde y Sánchez de Loria)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'lucia.fernandez@gmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.FISHERTON),
      },
      {
        titulo: 'Garage Parque Urquiza',
        direccion: '3 de Febrero 450 (Entre Necochea y Colón)',
        tipoGarage: 'Para moto',
        mailDueno: 'roberto.garage@gmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.BARRIO_MARTIN),
      },
      {
        titulo: 'Garage Alberdi Norte',
        direccion: 'Av. Alberdi 900 (Entre French y Agrelo)',
        tipoGarage: 'Para auto',
        mailDueno: 'martin.alberdi@gmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.ALBERDI),
      },
      {
        titulo: 'Garage La Sexta',
        direccion: 'Av. Pellegrini 1900 (Entre Moreno y Dorrego)',
        tipoGarage: 'Para moto',
        mailDueno: 'paula.mendez@gmail.com',
        estado: 'Disponible',
        zona: getZona(NombreZona.REPUBLICA_DE_LA_SEXTA),
      },
    ];

    for (const garage of garagesPorDefecto) {
      if (!garage.zona) {
        console.warn(
          `⚠️ No se encontró la zona para el garage "${garage.titulo}", verificá que las zonas estén seedadas correctamente`
        );
        continue;
      }
      const nuevoGarage = em.create(Garage, garage as any);
      em.persist(nuevoGarage);
    }

    await em.flush();
    console.log('Garages precargados correctamente');
  }
}
