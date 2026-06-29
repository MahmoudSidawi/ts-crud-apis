import { z } from 'zod';

export const createSupplierSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  contactName: z.string().optional(),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  phone: z.string().optional(),
  paymentTerms: z.string().optional(),
  leadTimeDays: z.number({ required_error: 'Lead time days is required' }).nonnegative('Lead time days must be positive'),
  isActive: z.boolean().optional(),
});

export const updateSupplierSchema = z.object({
  name: z.string().optional(),
  contactName: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  paymentTerms: z.string().optional(),
  leadTimeDays: z.number().nonnegative('Lead time days must be positive').optional(),
  isActive: z.boolean().optional(),
});
