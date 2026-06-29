import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  sku: string;
  name: string;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  supplierId: mongoose.Types.ObjectId;
  sellingPrice: number;
  costPrice?: number;
  quantityOnHand: number;
  reorderPoint?: number;
  isActive: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    sellingPrice: { type: Number, required: true },
    costPrice: { type: Number },
    quantityOnHand: { type: Number, required: true, default: 0 },
    reorderPoint: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
