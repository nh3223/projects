import { Router } from 'express';

import { getGrants, getGrant, createGrant, editGrant, deleteGrant } from '../controllers/equityGrantGrant.js';

const equityGrantRoutes = Router();

equityGrantRoutes.get('/executive/:executiveId', getGrants);
equityGrantRoutes.get('/:grantId', getGrant);
equityGrantRoutes.post('/', createGrant);
equityGrantRoutes.patch('/:grantId', editGrant);
equityGrantRoutes.delete('/:grantId', deleteGrant);

export default equityGrantRoutes;