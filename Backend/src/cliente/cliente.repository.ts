
import { EntityRepository } from '@mikro-orm/mysql';
import { orm } from '../shared/orm.js';
import { Cliente } from './cliente_entity.js';

export class ClienteRepository {
  private em = orm.em;

  async findAll(): Promise<Cliente[]> {
    return await this.em.find(Cliente, {});
  }

  async findOne(filter: Partial<Cliente>): Promise<Cliente | null> {
    return await this.em.findOne(Cliente, filter);
  }

  async add(cliente: Cliente): Promise<Cliente> {
    const entity = this.em.create(Cliente, cliente);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(id: number | string, data: Partial<Cliente>): Promise<Cliente | null> {
    const cliente = await this.em.findOne(Cliente, { idCliente: Number(id) });
    if (!cliente) return null;
    this.em.assign(cliente, data);
    await this.em.flush();
    return cliente;
  }

  async delete(filter: Partial<Cliente>): Promise<boolean> {
    const cliente = await this.em.findOne(Cliente, filter);
    if (!cliente) return false;
    await this.em.removeAndFlush(cliente);
    return true;
  }
}
