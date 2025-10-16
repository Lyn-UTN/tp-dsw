import { Tiporeserva, DescTipoReserva } from './tipoReserva_entity.js'
import { orm } from '../shared/orm.js'

export async function seedTipoReserva() {
  const em = orm.em.fork()
  const count = await em.count(Tiporeserva, {})

  if (count === 0) {
    const tiposPorDefecto: { descTipoReserva: DescTipoReserva }[] = [
      { descTipoReserva: 'xHora' },
      { descTipoReserva: 'xDia' },
      { descTipoReserva: 'xMes' },
    ]

    for (const tipo of tiposPorDefecto) {
      const nuevoTipo = em.create(Tiporeserva, tipo as any)
      em.persist(nuevoTipo)
    }

    await em.flush()
    console.log(' Tipos de reserva precargados correctamente')
  } 
}


