import mongoose from 'mongoose';
import Company from '../models/company.js';

export const getCompanies = async (req, res) => {
  try {
    console.log('getCompanies')
    const companies = await Company.find({ });
    console.log(companies);
    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getExecutives = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const company = await Company.findById(_id).populate('executives');
    const executives = company.executives;
    res.status(200).json(executives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const company = await Company.findById(_id);
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  const company = req.body;
  const newCompany = Company(company);
  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editCompany = async (req, res) => {
  const { id: _id } = req.params;
  const companyUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedCompany = await Company.findByIdAndUpdate(_id, companyUpdates, { new: true });
  res.json(updatedCompany);
};

export const deleteCompany = async (req, res) => {
  const {id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await Company.findByIdAndDelete(_id);
  res.json({ message: "Company Removed Successfully "});
};