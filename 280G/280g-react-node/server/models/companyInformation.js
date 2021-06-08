import mongoose from 'mongoose';

const company = {
  companyName: String,
  transactionDate: Date,
  transactionPrice: Number
};

const companySchema = mongoose.Schema(company);

const companyInformation = mongoose.model('CompanyInformation', companySchema);

export default companyInformation;