import mongoose from 'mongoose';

const name = {
  type: String,
  required: true
};

const transactionDate = {
  type: Date,
  required: true
}

const transactionPrice = {
  type: Number,
  required: true,
  validate(value) {
    if (value < 0) {
      throw new Error('Transaction Price must be a positive number');
    }
  }
}

const companyProperties = {
  name,
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