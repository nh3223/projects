import { Router } from 'express';

import { getExecutive, createExecutive, editExecutive, deleteExecutive } from '../controllers/executive.js';

const executiveRoutes = Router();

executiveRoutes.get('/:id', getExecutive);
executiveRoutes.post('/', createExecutive);
executiveRoutes.patch('/:id', editExecutive);
executiveRoutes.delete('/:id', deleteExecutive);

export default executiveRoutes;