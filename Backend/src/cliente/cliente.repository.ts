import { Repository } from '../shared/repository.js'
import { Cliente } from './cliente.entity.js'
import {pool} from '../shared/conn.mysql.js'
import { ResultSetHeader,RowDataPacket } from 'mysql2'  

export class ClienteRepository implements Repository<Cliente> {
 public async findAll(): Promise<Cliente[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.idCliente, c.licenciaConducir,
            u.idUsuario, u.nombre, u.apellido, u.tipoDocumento, u.documento, u.telefono, u.email, u.password
     FROM cliente c
     JOIN usuario u ON c.idUsuario = u.idUsuario`
  )

  return (rows as any[]).map(row => new Cliente(
    row.idUsuario,
    row.nombre,
    row.apellido,
    row.tipoDocumento,
    row.documento,
    row.telefono,
    row.email,
    row.password,
    row.idCliente,
    row.licenciaConducir
  ))
}

/* * Busca un cliente por su idCliente.*/
  public async findOne(item: { id: string }): Promise<Cliente | undefined> {
  const id = Number.parseInt(item.id)
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.idCliente, c.licenciaConducir,
            u.idUsuario, u.nombre, u.apellido, u.tipoDocumento, u.documento, u.telefono, u.email, u.password
     FROM cliente c
     JOIN usuario u ON c.idUsuario = u.idUsuario
     WHERE c.idCliente = ?`, [id]
  )

  if (rows.length === 0) {
    return undefined
  }

  const row = rows[0]
  return new Cliente(
    row.idUsuario,
    row.nombre,
    row.apellido,
    row.tipoDocumento,
    row.documento,
    row.telefono,
    row.email,
    row.password,
    row.idCliente,
    row.licenciaConducir
  )
}

/* Agrega un nuevo cliente, esto implica tambien agregar un usuario */

 public async add(clienteInput: Cliente): Promise<Cliente | undefined> {
  // Insertar en la tabla usuario primero
  const usuarioData = {
    nombre: clienteInput.nombre,
    apellido: clienteInput.apellido,
    tipoDocumento: clienteInput.tipoDocumento,
    documento: clienteInput.documento,
    telefono: clienteInput.telefono,
    email: clienteInput.email,
    password: clienteInput.password
  }

  const [usuarioResult] = await pool.query<ResultSetHeader>(
    'INSERT INTO usuario SET ?', [usuarioData]
  )

  const idUsuario = usuarioResult.insertId

  // Insertar en la tabla cliente junto con el idUsuario
  const [clienteResult] = await pool.query<ResultSetHeader>(
    'INSERT INTO cliente SET ?', [{
      idUsuario,
      licenciaConducir: clienteInput.licenciaConducir
    }]
  )

  clienteInput.idUsuario = idUsuario
  clienteInput.idCliente = clienteResult.insertId

  return clienteInput
}

/* Actualiza un cliente, esto implica actualizar ademas el usuario asociado */
public async update(id: string, clienteInput: Cliente): Promise<Cliente | undefined> {
  const idCliente = Number.parseInt(id);

  // Actualizar datos en usuario
  const usuarioData = {
    nombre: clienteInput.nombre,
    apellido: clienteInput.apellido,
    tipoDocumento: clienteInput.tipoDocumento,
    documento: clienteInput.documento,
    telefono: clienteInput.telefono,
    email: clienteInput.email,
    password: clienteInput.password
  };

  await pool.query(
    'UPDATE usuario SET ? WHERE idUsuario = ?',
    [usuarioData, clienteInput.idUsuario]
  );

  // Actualizar datos en cliente
  await pool.query(
    'UPDATE cliente SET licenciaConducir = ? WHERE idCliente = ?',
    [clienteInput.licenciaConducir, idCliente]
  );

  // Devolver el cliente actualizado
  return await this.findOne({ id });
}



  public async delete(item: { id: string }): Promise<Cliente | undefined> {
  try {
    const idCliente = Number.parseInt(item.id);

    // Paso 1: buscar cliente antes de eliminarlo
    const clienteToDelete = await this.findOne({ id: item.id });
    if (!clienteToDelete) return undefined;

    // Paso 2: eliminar de cliente
    await pool.query('DELETE FROM cliente WHERE idCliente = ?', [idCliente]);

    // Paso 3: eliminar de usuario
    await pool.query('DELETE FROM usuario WHERE idUsuario = ?', [clienteToDelete.idUsuario]);

    // Retornar el cliente eliminado
    return clienteToDelete;
  } catch (error) {
    throw new Error('unable to delete cliente');
  }
}

}