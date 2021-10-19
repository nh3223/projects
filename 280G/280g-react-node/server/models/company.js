import mongoose from 'mongoose';

const projectName = {
  type: String
};

const companyName = {
  type: String
};

const transactionDate = {
  type: Date
}

const transactionPrice = {
  type: Number,
  validate(value) {
    if (value <= 0) {
      throw new Error('Transaction Price must be a positive number');
    }
  }
}

const companyProperties = {
  projectName,
  companyName,
  transactionDate,
  transactionPrice
};

const companySchema = mongoose.Schema(companyProperties);

companySchema.virtual('executives', {
  ref: 'Executive',
  localField: '_id',
  foreignField: 'company'
});

const company = mongoose.model('Company', companySchema);

export default company;