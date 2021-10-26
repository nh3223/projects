import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import companyRoutes from './routes/company.js';
import executiveRoutes from './routes/executive.js';
import nonEquityPaymentRoutes from './routes/nonEquityPayments.js';
import equityGrantRoutes from './routes/equitygrant.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/company', companyRoutes);
app.use('/executive', executiveRoutes);
app.use('/nonequitypayment', nonEquityPaymentRoutes);
app.use('/equitygrant', equityGrantRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);


