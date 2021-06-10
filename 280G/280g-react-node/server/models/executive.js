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
}

const executiveProperties = {
  company,
  name,
  title
};

const executiveSchema = mongoose.Schema(executiveProperties);

const executive = mongoose.model('Executive', executiveSchema);

export default executive;