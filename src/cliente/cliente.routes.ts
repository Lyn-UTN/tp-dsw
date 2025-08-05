import { Router, type RequestHandler } from 'express'
import {
  sanitizeClienteInput,
  findAll,
  findOne,
  add,
  update,
  remove
} from './cliente.controler.js'

export const clienteRoute = Router()

clienteRoute.get('/', findAll )
clienteRoute.get('/:id', findOne )
clienteRoute.post('/', sanitizeClienteInput )
clienteRoute.put('/:id', sanitizeClienteInput )
clienteRoute.patch('/:id', sanitizeClienteInput )
clienteRoute.delete('/:id', remove)


