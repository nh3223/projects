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

const numberShares ={
  type: Number,
  require: true
};

const changeOfControlGrant = {
  type: Boolean,
  require: true
};

const percentageAcceleration = {
  type: Number,
  require: true
};

const newVestingDates = {
  type: [{
    date: Date,
    shares: Number
  }],
  required: true
};

const restrictedStockGrantProperties = {
  executive,
  grantDate,
  vestingStartDate,
  numberShares,
  changeOfControlGrant,
  percentageAcceleration,
  newVestingDates
};

const restrictedStockGrantSchema = mongoose.Schema(restrictedStockGrantProperties);

const restrictedStockGrant = mongoose.model('RestrictedStockGrant', restrictedStockGrantSchema);

export default restrictedStockGrant;