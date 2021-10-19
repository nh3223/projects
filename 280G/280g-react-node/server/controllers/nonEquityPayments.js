import mongoose from 'mongoose';
import NonEquityPayment from '../models/nonEquityPayments.js';
import Executive from '../models/executive.js';

export const getPayments = async (req, res) => {
  const { executiveId: _id } = req.params;
  try {
    const executive = await Executive.findById(_id).populate('nonEquityPayments');
    const payments = executive.nonEquityPayments;
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPayment = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const payment = await NonEquityPayment.findById(_id);
    res.status(200).json(payment)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPayment = async (req, res) => {
  const payment = req.body;
  const newPayment = NonEquityPayment(payment);
  try {
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPayment = async (req, res) => {
  const { id: _id } = req.params;
  const paymentUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  const updatedPayment = await NonEquityPayment.findByIdAndUpdate(_id, paymentUpdates, { new: true });
  res.json(updatedPayment);
};

export const deletePayment = async (req, res) => {
  const {id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Request Failed');

  await NonEquityPayment.findByIdAndDelete(_id);
  res.json({ message: "Payment Removed Successfully "});
};