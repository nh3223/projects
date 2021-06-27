import { Router } from 'express';

import { getPayments, getPayment, createPayment, editPayment, deletePayment } from '../controllers/nonEquityPayments.js';

const nonEquityPaymentRoutes = Router();

nonEquityPaymentRoutes.get('/executive/:id', getPayments);
nonEquityPaymentRoutes.get('/:id', getPayment);
nonEquityPaymentRoutes.post('/', createPayment);
nonEquityPaymentRoutes.patch('/:id', editPayment);
nonEquityPaymentRoutes.delete('/:id', deletePayment);

export default nonEquityPaymentRoutes;