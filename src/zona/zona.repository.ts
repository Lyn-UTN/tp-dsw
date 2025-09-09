import { Zona } from './zona_entity.js'
import { orm } from '../shared/orm.js'

const em = orm.em

export class ZonaRepository {
  async findAll(): Promise<Zona[]> {
    return await em.find(Zona, {})
  }

  async findOne(id: number): Promise<Zona | null> {
    return await em.findOne(Zona, { id })
  }

  async findOneOrFail(id: number): Promise<Zona> {
    return await em.findOneOrFail(Zona, { id })
  }

  async add(data: { nombreZona: string }): Promise<Zona> {
  const zona = em.create(Zona, data)
  await em.flush()
  return zona
}


  async update(id: number, data: Partial<Zona>): Promise<Zona | null> {
    const zona = await em.findOne(Zona, { id })
    if (!zona) return null
    em.assign(zona, data)
    await em.flush()
    return zona
  }

  async remove(id: number): Promise<boolean> {
    const zona = await em.findOne(Zona, { id })
    if (!zona) return false
    await em.removeAndFlush(zona)
    return true
  }
}
