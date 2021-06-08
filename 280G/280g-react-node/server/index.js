import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import companyRoutes from './routes/companyInformation.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/company', companyRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);


