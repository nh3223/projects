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

const executiveProperties = {
  company,
  name,
  title
};

const executiveSchema = mongoose.Schema(executiveProperties);

executiveSchema.virtual('compensations', {
  ref: 'Compensation',
  localField: '_id',
  foreignField: 'executive'
});

executiveSchema.virtual('nonEquityPayments', {
  ref: 'NonEquityPayment',
  localField: '_id',
  foreignField: 'executive'
});

const executive = mongoose.model('Executive', executiveSchema);

export default executive;