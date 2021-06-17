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

const executiveProperties = {
  company,
  name,
  title,
  startDate,
  firstYearPayments
};

const executiveSchema = mongoose.Schema(executiveProperties);

executiveSchema.virtual('compensations', {
  ref: 'Compensation',
  localField: '_id',
  foreignField: 'executive'
});

const executive = mongoose.model('Executive', executiveSchema);

export default executive;