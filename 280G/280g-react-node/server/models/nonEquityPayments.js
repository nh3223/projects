import mongoose from 'mongoose';

const executive = {
  type: mongoose.Schema.Types.ObjectId,
  require: true,
  ref: 'Executive'
};

const description = {
  type: String
};

const amount = {
  type: Number
};

const nonEquityPaymentProperties = {
  executive,
  description,
  amount
};

const nonEquityPaymentSchema = mongoose.Schema(nonEquityPaymentProperties);

const nonEquityPayment = mongoose.model('NonEquityPayment', nonEquityPaymentSchema);

export default nonEquityPayment;