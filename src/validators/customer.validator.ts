import { z } from 'zod';

export const createCustomerSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  phone: z.string().optional(),
  loyaltyPoints: z.number().nonnegative().optional(),
  totalSpent: z.number().nonnegative().optional(),
});

export const updateCustomerSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  loyaltyPoints: z.number().nonnegative().optional(),
  totalSpent: z.number().nonnegative().optional(),
});
