import { Router } from 'express';

import { getCompanyInformation, createCompany, editCompanyInformation, deleteCompany } from '../controllers/companyInformation.js';

const companyRoutes = Router();

companyRoutes.get('/:id', getCompanyInformation);
companyRoutes.post('/', createCompany);
companyRoutes.patch('/:id', editCompanyInformation);
companyRoutes.delete('/:id', deleteCompany);

export default companyRoutes;