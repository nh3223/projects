import { Router } from 'express';

import { getGrants, getGrant, createGrant, editGrant, deleteGrant } from '../controllers/restrictedStockGrant.js';

const restrictedStockRoutes = Router();

restrictedStockRoutes.get('/executive/:id', getGrants);
restrictedStockRoutes.get('/:id', getGrant);
restrictedStockRoutes.post('/', createGrant);
restrictedStockRoutes.patch('/:id', editGrant);
restrictedStockRoutes.delete('/:id', deleteGrant);

export default restrictedStockRoutes;