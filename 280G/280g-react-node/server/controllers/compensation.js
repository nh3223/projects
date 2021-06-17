import mongoose from 'mongoose';
import Compensation from '../models/compensation.js';
import Executive from '../models/executive.js';

export const getCompensation = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const executive = await Executive.findById(_id).populate('compensations');
    const compensations = executive.compensations;
    res.status(200).json(compensations);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const { id: _id } = req.params;
  const compensationUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedCompensation = await Compensation.findByIdAndUpdate(_id, compensationUpdates, { new: true });
  res.json(updatedCompensation);
};

export const deleteCompensation = async (req, res) => {
  const {id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await Compensation.findByIdAndDelete(_id);
  res.json({ message: "Compensation Removed Successfully "});
};