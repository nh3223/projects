import mongoose from 'mongoose';
import CompanyInformation from '../models/companyInformation.js';

export const getCompanyInformation = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const companyInformation = await CompanyInformation.findById(_id);
    res.status(200).json(companyInformation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  const company = req.body;
  const newCompany = CompanyInformation(company);
  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editCompanyInformation = async (req, res) => {
  const { id: _id } = req.params;
  const companyInformation = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedCompany = await CompanyInformation.findByIdAndUpdate(_id, companyInformation, { new: true });
  res.json(companyInformation);
};

export const deleteCompany = async (req, res) => {
  const {id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await CompanyInformation.findByIdAndDelete(_id);
  res.json({ message: "Post Removed Successfully "});
};