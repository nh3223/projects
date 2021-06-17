import mongoose from 'mongoose';

const executive = {
  type: mongoose.Schema.Types.ObjectId,
  require: true,
  ref: 'Executive'
};

const year = {
  type: Number
};

const annualCompensation = {
  type: Number
};

const compensationProperties = {
  executive,
  year,
  annualCompensation
};

const compensationSchema = mongoose.Schema(compensationProperties);

const compensation = mongoose.model('Compensation', compensationSchema);

export default compensation;