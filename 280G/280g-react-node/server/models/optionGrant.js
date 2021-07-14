import mongoose from 'mongoose';

const executive = {
  type: mongoose.Schema.Types.ObjectId,
  require: true,
  ref: 'Executive'
};

const grantDate = {
  type: Date,
  require: true,
};

const vestingStartDate = {
  type: Date,
  require: true
};

const numberOptions = {
  type: Number,
  require: true
};

const exercisePrice = {
  type: Number,
  require: true
};

const changeOfControlGrant = {
  type: Boolean,
  require: true
};

const rollover = {
  type: Boolean,
  require: true
};

const percentageAcceleration = {
  type: Number,
  require: true
};

const vestingSchedule = {
  type: [{
    oldDate: Date,
    newDate: Date,
    shares: Number
  }],
  required: true
};

const optionGrantProperties = {
  executive,
  grantDate,
  vestingStartDate,
  numberOptions,
  exercisePrice,
  changeOfControlGrant,
  rollover,
  percentageAcceleration,
  vestingSchedule
};

const optionGrantSchema = mongoose.Schema(optionGrantProperties);

const optionGrant = mongoose.model('OptionGrant', optionGrantSchema);

export default optionGrant;