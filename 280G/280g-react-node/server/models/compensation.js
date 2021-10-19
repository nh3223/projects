import mongoose from 'mongoose';

const executive = {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'Executive'
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

const compensationProperties = {
  executive,
  startDate,
  firstYearPayments,
  basePeriodCompensation
};

const compensationSchema = mongoose.Schema(compensationProperties);

const compensation = mongoose.model('Compensation', compensationSchema);

export default compensation;