import mongoose from 'mongoose';

const executive = {
  type: mongoose.Schema.Types.ObjectId,
  require: true,
  ref: 'Executive'
};

const grantType = {
  type: String
}

const grantDate = {
  type: Date
};

const vestingStartDate = {
  type: Date
};

const numberShares = {
  type: Number
};

const exercisePrice = {
  type: Number
};

const changeOfControl = {
  type: Boolean
};

const acceleration = {
  type: Boolean
};

const accelerationPercentage = {
  type: Number
};

// const accelerationMethod = {
//   type: String
// };

const cliff = {
  type: Boolean
};

const cliffDuration = {
  type: Number
};

const cliffPercentage = {
  type: Number
};

const remainderPeriods = {
  type: Number
};

const remainderType = {
  type: String
};

const vestingSchedule = {
  type: [{
    oldVestingDate: Date,
    newVestingDate: Date,
    shares: Number
  }],
  required: true
};

const equityGrantProperties = {
  executive,
  grantType,
  grantDate,
  vestingStartDate,
  numberShares,
  exercisePrice,
  changeOfControl,
  acceleration,
  accelerationPercentage,
  cliff,
  cliffDuration,
  cliffPercentage,
  remainderPeriods,
  remainderType,
  vestingSchedule
};

const equityGrantSchema = mongoose.Schema(equityGrantProperties);

const equityGrant = mongoose.model('EquityGrant', equityGrantSchema);

export default equityGrant;