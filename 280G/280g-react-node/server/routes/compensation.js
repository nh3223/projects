import { Router } from 'express';

import { getCompensation, createCompensation, editCompensation, deleteCompensation } from '../controllers/compensation.js';

const compensationRoutes = Router();

compensationRoutes.get('/executive/:id', getCompensation);
compensationRoutes.post('/', createCompensation);
compensationRoutes.patch('/:id', editCompensation);
compensationRoutes.delete('/:id', deleteCompensation);

export default compensationRoutes;