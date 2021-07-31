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

const numberShares = {
  type: Number,
  require: true
};

const changeOfControl = {
  type: Boolean,
  require: true
};

const acceleration = {
  type: Boolean,
  require: true
}

const accelerationPercentage = {
  type: Number
};

const accelerationMethod = {
  type: String
};

const cliff = {
  type: Boolean,
  require: true
};

const cliffPercentage = {
  type: Number
};

const cliffDuration = {
  type: Number
};

const remainderPeriods = {
  type: Number,
  require: true
};

const remainderType = {
  type: String,
  require: true
}

const restrictedStockGrantProperties = {
  executive,
  grantDate,
  vestingStartDate,
  numberShares,
  changeOfControl,
  acceleration,
  accelerationPercentage,
  accelerationMethod,
  cliff,
  cliffPercentage,
  cliffDuration,
  remainderPeriods,
  remainderType
};

const restrictedStockGrantSchema = mongoose.Schema(restrictedStockGrantProperties);

const restrictedStockGrant = mongoose.model('RestrictedStockGrant', restrictedStockGrantSchema);

export default restrictedStockGrant;