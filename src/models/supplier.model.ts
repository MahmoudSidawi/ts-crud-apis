import mongoose, { Document, Schema } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  contactName?: string;
  email: string;
  phone?: string;
  paymentTerms?: string;
  leadTimeDays: number;
  isActive: boolean;
}

const SupplierSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    contactName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    paymentTerms: { type: String },
    leadTimeDays: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema);
