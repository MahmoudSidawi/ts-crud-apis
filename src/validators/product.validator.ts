import { z } from 'zod';

// MongoDB ObjectId regex for validation
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createProductSchema = z.object({
  sku: z.string({ required_error: 'SKU is required' }),
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  categoryId: z.string({ required_error: 'Category ID is required' }).regex(objectIdRegex, 'Invalid Category ID'),
  supplierId: z.string({ required_error: 'Supplier ID is required' }).regex(objectIdRegex, 'Invalid Supplier ID'),
  sellingPrice: z.number({ required_error: 'Selling price is required' }).nonnegative('Selling price must be >= 0'),
  costPrice: z.number().nonnegative().optional(),
  quantityOnHand: z.number({ required_error: 'Quantity on hand is required' }).nonnegative('Quantity on hand must be >= 0'),
  reorderPoint: z.number().nonnegative().optional(),
  isActive: z.boolean().optional(),
});

export const updateProductSchema = z.object({
  sku: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().regex(objectIdRegex, 'Invalid Category ID').optional(),
  supplierId: z.string().regex(objectIdRegex, 'Invalid Supplier ID').optional(),
  sellingPrice: z.number().nonnegative('Selling price must be >= 0').optional(),
  costPrice: z.number().nonnegative().optional(),
  quantityOnHand: z.number().nonnegative('Quantity on hand must be >= 0').optional(),
  reorderPoint: z.number().nonnegative().optional(),
  isActive: z.boolean().optional(),
});
