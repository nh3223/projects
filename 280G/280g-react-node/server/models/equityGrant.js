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
  type: String
};

const vestingStartDate = {
  type: String
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

const cliffMethod = {
  type: String
};

const remainderPeriods = {
  type: Number
};

const remainderType = {
  type: String
};

const vestingSchedule = {
  type: [{
    oldVestingDate: String,
    newVestingDate: String,
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
  cliffMethod,
  remainderPeriods,
  remainderType,
  vestingSchedule
};

const equityGrantSchema = mongoose.Schema(equityGrantProperties);

const equityGrant = mongoose.model('EquityGrant', equityGrantSchema);

export default equityGrant;