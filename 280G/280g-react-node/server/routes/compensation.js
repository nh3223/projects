import { Router } from 'express';

import { getCompensation, createCompensation, editCompensation, deleteCompensation } from '../controllers/compensation.js';

const compensationRoutes = Router();

compensationRoutes.get('/:executiveId', getCompensation);
compensationRoutes.post('/', createCompensation);
compensationRoutes.patch('/:executiveId', editCompensation);
compensationRoutes.delete('/:executiveId', deleteCompensation);

export default compensationRoutes;