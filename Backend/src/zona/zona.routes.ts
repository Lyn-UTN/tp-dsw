import { Router } from 'express'
import { sanitizeZonaInput, findAll, findOne, add, update, remove } from './zona.controler'

export const zonaRouter = Router()

zonaRouter.get('/', findAll)
zonaRouter.get('/:id', findOne)
zonaRouter.post('/', sanitizeZonaInput, add)
zonaRouter.put('/:id', sanitizeZonaInput, update)
zonaRouter.patch('/:id', sanitizeZonaInput, update)
zonaRouter.delete('/:id', remove)