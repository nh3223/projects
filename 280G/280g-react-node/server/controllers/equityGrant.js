import mongoose from 'mongoose';
import EquityGrant from '../models/equityGrant.js';
import Executive from '../models/executive.js';

export const getGrants = async (req, res) => {
  const { executiveId: _id } = req.params;
  try {
    const executive = await Executive.findById(_id).populate('equityGrants');
    const grants = executive.equityGrants;
    res.status(200).json(grants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGrant = async (req, res) => {
  const { grantId: _id } = req.params;
  try {
    const grant = await EquityGrant.findById(_id);
    res.status(200).json(grant)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createGrant = async (req, res) => {
  const grant = req.body;
  const newGrant = EquityGrant(grant);
  try {
    await newGrant.save();
    res.status(201).json(newGrant);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editGrant = async (req, res) => {
  const { grantId: _id } = req.params;
  const grantUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedGrant = await EquityGrant.findByIdAndUpdate(_id, grantUpdates, { new: true });
  res.json(updatedGrant);
};

export const deleteGrant = async (req, res) => {
  const { grantId: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await EquityGrant.findByIdAndDelete(_id);
  res.json({ message: "Grant Removed Successfully "});
};