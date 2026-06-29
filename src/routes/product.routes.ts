import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { validate } from '../middlewares/validate.middleware';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';

const router = Router();

router.route('/')
  .post(validate(createProductSchema), createProduct)
  .get(getProducts);

router.route('/:id')
  .get(getProductById)
  .put(validate(updateProductSchema), updateProduct)
  .delete(deleteProduct);

export default router;
