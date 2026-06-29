import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const orderItemSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }).regex(objectIdRegex, 'Invalid Product ID'),
  sku: z.string({ required_error: 'SKU is required' }),
  name: z.string({ required_error: 'Name is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }).positive('Quantity must be greater than 0'),
  unitPrice: z.number({ required_error: 'Unit price is required' }).nonnegative('Unit price must be >= 0'),
  lineTotal: z.number({ required_error: 'Line total is required' }).nonnegative('Line total must be >= 0'),
});

export const createOrderSchema = z.object({
  orderNumber: z.string({ required_error: 'Order number is required' }),
  customerId: z.string({ required_error: 'Customer ID is required' }).regex(objectIdRegex, 'Invalid Customer ID'),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).optional(),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
  subtotal: z.number({ required_error: 'Subtotal is required' }).nonnegative(),
  tax: z.number({ required_error: 'Tax is required' }).nonnegative(),
  grandTotal: z.number({ required_error: 'Grand total is required' }).nonnegative(),
});

export const updateOrderSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).optional(),
  items: z.array(orderItemSchema).min(1).optional(),
  subtotal: z.number().nonnegative().optional(),
  tax: z.number().nonnegative().optional(),
  grandTotal: z.number().nonnegative().optional(),
});
