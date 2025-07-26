import { Schema, Document, models, model } from "mongoose";

export interface VendorDocument extends Document {
  _id: string;
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}


const VendorSchema = new Schema<VendorDocument>(
  {
    vendorName: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
    bankName: { type: String, required: true },
    addressLine1: String,
    addressLine2: String,
    city: String,
    country: String,
    zipCode: String,
  },
  { timestamps: true }
);

export default models.Vendor || model<VendorDocument>("Vendor", VendorSchema);
