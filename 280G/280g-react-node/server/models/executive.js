import mongoose from 'mongoose';

const company = {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'Company'
};

const name = {
  type: String,
  required: true
};

const title = {
  type: String
};

const startDate = {
  type: Date
};

const firstYearPayments = {
  type: Number
};

const basePeriodCompensation = [{
  year: Number,
  compensation: Number
}];

const executiveProperties = {
  company,
  name,
  title,
  startDate,
  firstYearPayments,
  basePeriodCompensation
};

const executiveSchema = mongoose.Schema(executiveProperties);

executiveSchema.virtual('nonEquityPayments', {
  ref: 'NonEquityPayment',
  localField: '_id',
  foreignField: 'executive'
});

executiveSchema.virtual('restrictedStockGrants', {
  ref: 'RestrictedStockGrant',
  localField: '_id',
  foreignField: 'executive'
});

executiveSchema.virtual('optionGrants', {
  ref: 'OptionGrant',
  localField: '_id',
  foreignField: 'executive'
});

const executive = mongoose.model('Executive', executiveSchema);

export default executive;