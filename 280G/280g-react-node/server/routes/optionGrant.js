import { Router } from 'express';

import { getGrants, getGrant, createGrant, editGrant, deleteGrant } from '../controllers/optionGrant.js';

const optionRoutes = Router();

optionRoutes.get('/executive/:id', getGrants);
optionRoutes.get('/:id', getGrant);
optionRoutes.post('/', createGrant);
optionRoutes.patch('/:id', editGrant);
optionRoutes.delete('/:id', deleteGrant);

export default optionRoutes;