import mongoose from 'mongoose';
import Compensation from '../models/compensation.js';

export const getCompensation = async (req, res) => {
  const { executiveId: executive } = req.params;
  try {
    const compensation = await Compensation.findOne({ executive });
    res.status(200).json(compensation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompensation = async (req, res) => {
  const compensation = req.body;
  const newCompensation = Compensation(compensation);
  try {
    await newCompensation.save();
    res.status(201).json(newCompensation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editCompensation = async (req, res) => {
  const { executiveId: executive } = req.params;
  const compensationUpdates = req.body;

  // if (!mongoose.Types.ObjectId.isValid(executive)) return res.status(404).send('Request Failed');

  const updatedCompensation = await Compensation.findOneAndUpdate({ executive }, compensationUpdates, { new: true });
  res.json(updatedCompensation);
};

export const deleteCompensation = async (req, res) => {
  const {executiveId: executive } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(executive)) return res.status(404).send('Request Failed');

  await Compensation.findOneAndDelete({ executive });
  res.json({ message: "Compensation Removed Successfully "});
};