import mongoose from 'mongoose';
import RestrictedStockGrant from '../models/restrictedStockGrant.js';
import Executive from '../models/executive.js';

export const getGrants = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const executive = await Executive.findById(_id).populate('restrictedStockGrants');
    console.log(executive);
    const grants = executive.restrictedStockGrants;
    console.log(grants);
    res.status(200).json(grants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGrant = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const grant = await RestrictedStockGrant.findById(_id);
    res.status(200).json(grant)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createGrant = async (req, res) => {
  const grant = req.body;
  const newGrant = RestrictedStockGrant(grant);
  try {
    await newGrant.save();
    res.status(201).json(newGrant);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editGrant = async (req, res) => {
  const { id: _id } = req.params;
  const grantUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedGrant = await RestrictedStockGrant.findByIdAndUpdate(_id, grantUpdates, { new: true });
  res.json(updatedGrant);
};

export const deleteGrant = async (req, res) => {
  const {id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await RestrictedStockGrant.findByIdAndDelete(_id);
  res.json({ message: "Grant Removed Successfully "});
};