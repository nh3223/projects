import { Router } from 'express';

import { getCompanies, getExecutives, getCompany, createCompany, editCompany, deleteCompany } from '../controllers/company.js';

const companyRoutes = Router();

companyRoutes.get('/', getCompanies);
companyRoutes.get('/executives/:id', getExecutives)
companyRoutes.get('/:id', getCompany);
companyRoutes.post('/', createCompany);
companyRoutes.patch('/:id', editCompany);
companyRoutes.delete('/:id', deleteCompany);

export default companyRoutes;