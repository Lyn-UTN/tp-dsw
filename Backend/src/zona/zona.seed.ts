import { Zona } from './zona_entity.js'
import { orm } from '../shared/orm.js'

export async function seedZonas() {
  const em = orm.em.fork()
  const count = await em.count(Zona, {})

  if (count === 0) {
    const zonasPorDefecto = [
      { nombreZona: 'Centro' },
      { nombreZona: 'Norte' },
      { nombreZona: 'Sur' },
      { nombreZona: 'Este' },
      { nombreZona: 'Oeste' },
    ]

    for (const zona of zonasPorDefecto) {
      const nuevaZona = em.create(Zona, zona as any)
      em.persist(nuevaZona)
    }

    await em.flush()
    console.log('Zonas precargadas correctamente')
  } 
}
