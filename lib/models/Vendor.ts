import mongoose, { Schema, models, model } from 'mongoose';

const VendorSchema = new Schema({
  vendorName: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  bankName: { type: String, required: true },
  addressLine1: String,
  addressLine2: String,
  city: String,
  country: String,
  zipCode: String
}, { timestamps: true });

export default models.Vendor || model('Vendor', VendorSchema);
