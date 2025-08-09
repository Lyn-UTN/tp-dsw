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
clienteRoute.post('/', sanitizeClienteInput,add )
clienteRoute.put('/:id', sanitizeClienteInput, update )
clienteRoute.patch('/:id', sanitizeClienteInput, update)
clienteRoute.delete('/:id', remove)


