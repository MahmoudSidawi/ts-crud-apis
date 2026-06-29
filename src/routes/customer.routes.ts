import { Router } from 'express';
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCustomerSchema, updateCustomerSchema } from '../validators/customer.validator';

const router = Router();

router.route('/')
  .post(validate(createCustomerSchema), createCustomer)
  .get(getCustomers);

router.route('/:id')
  .get(getCustomerById)
  .put(validate(updateCustomerSchema), updateCustomer)
  .delete(deleteCustomer);

export default router;
