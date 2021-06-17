import mongoose from 'mongoose';
import Executive from '../models/executive.js';

export const getExecutive = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const executive = await Executive.findById(_id);
    res.status(200).json(executive);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createExecutive = async (req, res) => {
  const executive = req.body;
  const newExecutive = Executive(executive);
  console.log(executive);
  console.log(newExecutive);
  try {
    await newExecutive.save();
    res.status(201).json(newExecutive);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editExecutive = async (req, res) => {
  const { id: _id } = req.params;
  const executiveUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedExecutive = await Executive.findByIdAndUpdate(_id, executiveUpdates, { new: true });
  res.json(updatedExecutive);
};

export const deleteExecutive = async (req, res) => {
  const {id: _id } = req.params;
  
  console.log('deleteexecutive', _id);

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await Executive.findByIdAndDelete(_id);
  res.json({ message: "Executive Removed Successfully "});
};