import mongoose from 'mongoose';

const company = {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'Company'
};

const executiveName = {
  type: String,
};

const title = {
  type: String
};

const executiveProperties = {
  company,
  executiveName,
  title
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