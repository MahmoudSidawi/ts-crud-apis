import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplier.controller';
import { validate } from '../middlewares/validate.middleware';
import { createSupplierSchema, updateSupplierSchema } from '../validators/supplier.validator';

const router = Router();

router.route('/')
  .post(validate(createSupplierSchema), createSupplier)
  .get(getSuppliers);

router.route('/:id')
  .get(getSupplierById)
  .put(validate(updateSupplierSchema), updateSupplier)
  .delete(deleteSupplier);

export default router;
