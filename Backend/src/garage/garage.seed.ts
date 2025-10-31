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
        precio: 150,
        zona: getZona(NombreZona.CENTRO),
        descripcion:
          'Espacio techado y seguro en el centro. Acceso rápido a tribunales y oficinas, ideal para estancias diarias.',
        imagen:
          'https://plus.unsplash.com/premium_photo-1748783615197-8572ea838111?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      },
      {
        titulo: 'Garage Pichincha Parking',
        direccion: 'Ovidio Lagos 1200 (Entre Salta y Jujuy)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'maria.sosa@hotmail.com',
        estado: 'Disponible',
        precio: 180,
        zona: getZona(NombreZona.PICHINCHA),
        descripcion:
          'Amplio garage con entrada ancha y vigilancia. Perfecto para camionetas y vehículos de gran porte.',
        imagen:
          'https://images.unsplash.com/photo-1698222489084-4e70447821a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      },
      {
        titulo: 'Garage Córdoba Oeste',
        direccion: 'Av. Córdoba 3500 (Entre Cafferata y Vera Mujica)',
        tipoGarage: 'Para auto',
        mailDueno: 'carlos.rodriguez@gmail.com',
        estado: 'Disponible',
        precio: 140,
        zona: getZona(NombreZona.ECHESORTU),
        descripcion:
          'Excelente opción cerca de zonas comerciales. Techado, con control de acceso y buena iluminación.',
        imagen:
          'https://images.unsplash.com/photo-1739192415587-f846fb6c731c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      },
      {
        titulo: 'Garage Fisherton Express',
        direccion: 'Av. Eva Perón 8200 (Entre Wilde y Sánchez de Loria)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'lucia.fernandez@gmail.com',
        estado: 'Disponible',
        precio: 200,
        zona: getZona(NombreZona.FISHERTON),
        descripcion:
          'Ubicado en Fisherton, vigilancia 24/7 y entradas espaciosas. Ideal para quienes necesitan dejar la camioneta con seguridad.',
        imagen:
          'https://images.unsplash.com/photo-1752758814572-8740e4b4e5da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      },
      {
        titulo: 'Garage Parque Urquiza',
        direccion: '3 de Febrero 450 (Entre Necochea y Colón)',
        tipoGarage: 'Para moto',
        mailDueno: 'roberto.garage@gmail.com',
        estado: 'Disponible',
        precio: 80,
        zona: getZona(NombreZona.BARRIO_MARTIN),
        descripcion:
          'Pequeño y económico, cercano al parque Urquiza. Ideal para motos y estancias cortas durante el día.',
        imagen:
          'https://images.unsplash.com/photo-1735320787234-48dcd22d7a1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1455',
      },
      {
        titulo: 'Garage Alberdi Norte',
        direccion: 'Av. Alberdi 900 (Entre French y Agrelo)',
        tipoGarage: 'Para auto',
        mailDueno: 'martin.alberdi@gmail.com',
        estado: 'Disponible',
        precio: 130,
        zona: getZona(NombreZona.ALBERDI),
        descripcion:
          'Garage con rampa suave y espacio cómodo para maniobrar. Ubicación céntrica en Alberdi Norte.',
        imagen:
          'https://images.unsplash.com/photo-1755147047410-a82546b9342d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      },
      {
        titulo: 'Garage La Sexta',
        direccion: 'Av. Pellegrini 1900 (Entre Moreno y Dorrego)',
        tipoGarage: 'Para moto',
        mailDueno: 'paula.mendez@gmail.com',
        estado: 'Disponible',
        precio: 90,
        zona: getZona(NombreZona.REPUBLICA_DE_LA_SEXTA),
        descripcion:
          'Buena opción cerca de facultades y vida nocturna. Estacionamiento cubierto para motos y vehículos pequeños.',
        imagen:
          'https://images.unsplash.com/photo-1754389996825-a17055921a4f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
      },

      {
        titulo: 'Garage Sarmiento Central',
        direccion: 'Sarmiento 1200 (Entre San Martín y Rioja)',
        tipoGarage: 'Para auto',
        mailDueno: 'esteban.sarmiento@gmail.com',
        estado: 'Disponible',
        precio: 155,
        zona: getZona(NombreZona.CENTRO),
        descripcion:
          'Ubicado en el eje comercial, vigilancia y accesos rápidos. Espacios amplios y salida directa a arterias principales.',
        imagen:
          'https://images.unsplash.com/photo-1740817589657-370cbc32bc09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      },
      {
        titulo: 'Garage Pellegrini Sur',
        direccion: 'Av. Pellegrini 2500 (Entre Jujuy y Pasco)',
        tipoGarage: 'Para auto',
        mailDueno: 'sofia.pellegrini@gmail.com',
        estado: 'Disponible',
        precio: 145,
        zona: getZona(NombreZona.REPUBLICA_DE_LA_SEXTA),
        descripcion:
          'Cercano a restaurantes y comercios, ideal para dejar el auto durante la jornada laboral. Buen sistema de cámaras.',
        imagen:
          'https://images.unsplash.com/photo-1758448721161-7b3df5ec04b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332',
      },
      {
        titulo: 'Garage España Oeste',
        direccion: 'España 2100 (Entre San Lorenzo y 9 de Julio)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'alejandro.espana@gmail.com',
        estado: 'Disponible',
        precio: 190,
        zona: getZona(NombreZona.CENTRO),
        descripcion:
          'Garage amplio con altura para vehículos altos. Guardia y buen acceso a avenidas principales.',
        imagen:
          'https://images.unsplash.com/photo-1710140974563-842bc9fae78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      },
      {
        titulo: 'Garage Oroño Norte',
        direccion: 'Bv. Oroño 800 (Entre Córdoba y Güemes)',
        tipoGarage: 'Para auto',
        mailDueno: 'marina.orono@gmail.com',
        estado: 'Disponible',
        precio: 170,
        zona: getZona(NombreZona.CENTRO),
        descripcion:
          'Ubicado sobre Bv. Oroño, excelente para quienes trabajan cerca del centro. Techado y con ventilación natural.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=11',
      },
      {
        titulo: 'Garage Rioja Express',
        direccion: 'Rioja 600 (Entre San Luis y Entre Ríos)',
        tipoGarage: 'Para moto',
        mailDueno: 'juanita.rioja@gmail.com',
        estado: 'Disponible',
        precio: 85,
        zona: getZona(NombreZona.ECHESORTU),
        descripcion:
          'Pequeño garage ideal para motos. Ubicación práctica para accesos rápidos al microcentro.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=12',
      },
      {
        titulo: 'Garage Paraguay Centro',
        direccion: 'Paraguay 1700 (Entre Tucumán y Córdoba)',
        tipoGarage: 'Para auto',
        mailDueno: 'federico.paraguay@gmail.com',
        estado: 'Disponible',
        precio: 160,
        zona: getZona(NombreZona.CENTRO),
        descripcion:
          'Garage céntrico con buen nivel de ocupación. Ideal para dejar el auto mientras se hacen trámites o compras.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=13',
      },
      {
        titulo: 'Garage San Martín Norte',
        direccion: 'San Martín 2300 (Entre Moreno y Pueyrredón)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'luciano.sanmartin@gmail.com',
        estado: 'Disponible',
        precio: 185,
        zona: getZona(NombreZona.ALBERDI),
        descripcion:
          'Espacio con acceso fácil y vigilancia. Pensado para vehículos grandes y uso prolongado por mes.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=14',
      },
      {
        titulo: 'Garage Balcarce Parking',
        direccion: 'Balcarce 300 (Entre San Luis y Rioja)',
        tipoGarage: 'Para auto',
        mailDueno: 'veronica.balcarce@gmail.com',
        estado: 'Disponible',
        precio: 150,
        zona: getZona(NombreZona.ALBERDI),
        descripcion:
          'Buena opción para visitas al hospital y áreas comerciales. Espacios numerados y control de entrada.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=15',
      },
      {
        titulo: 'Garage 9 de Julio',
        direccion: '9 de Julio 1100 (Entre Salta y San Juan)',
        tipoGarage: 'Para moto',
        mailDueno: 'nicolas.9dejulio@gmail.com',
        estado: 'Disponible',
        precio: 75,
        zona: getZona(NombreZona.BARRIO_MARTIN),
        descripcion:
          'Económico y cercano a paradas de colectivo. Ideal para motos y estancias rápidas en la zona.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=16',
      },
      {
        titulo: 'Garage Fisherton Norte',
        direccion: 'Luis Thorne 5200 (Entre Camino a Fisherton y Bv. Seguí)',
        tipoGarage: 'Para auto',
        mailDueno: 'gabriela.fisherton@gmail.com',
        estado: 'Disponible',
        precio: 175,
        zona: getZona(NombreZona.FISHERTON),
        descripcion:
          'Zona residencial con acceso fácil y espacio techado. Perfecto para estancias mensuales y guardado seguro.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=17',
      },
      {
        titulo: 'Garage Echesortu Central',
        direccion: 'Av. Cafferata 2900 (Entre Av. Freyre y Bv. Oroño)',
        tipoGarage: 'Para auto',
        mailDueno: 'ale.cafferata@gmail.com',
        estado: 'Disponible',
        precio: 145,
        zona: getZona(NombreZona.ECHESORTU),
        descripcion:
          'Buen equilibrio entre precio y ubicación. Seguridad y acceso para residentes y trabajadores de la zona.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=18',
      },
      {
        titulo: 'Garage Barrio Martin Oeste',
        direccion: 'San Lorenzo 2600 (Entre 3 de Febrero y 2 de Mayo)',
        tipoGarage: 'Para auto',
        mailDueno: 'isabel.martin@gmail.com',
        estado: 'Disponible',
        precio: 135,
        zona: getZona(NombreZona.BARRIO_MARTIN),
        descripcion:
          'Cercano a centros deportivos y escuelas. Espacios seguros y personal amable en recepción.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=19',
      },
      {
        titulo: 'Garage República Norte',
        direccion: 'Pellegrini 1600 (Entre Paraguay y 9 de Julio)',
        tipoGarage: 'Para camioneta',
        mailDueno: 'mario.republica@gmail.com',
        estado: 'Disponible',
        precio: 195,
        zona: getZona(NombreZona.REPUBLICA_DE_LA_SEXTA),
        descripcion:
          'Amplio y techado, con capacidad para vehículos grandes. Vigilancia y control de accesos las 24 horas.',
        imagen: 'https://source.unsplash.com/1600x900/?parking,garage&sig=20',
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
