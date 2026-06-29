import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator';

const router = Router();

router.route('/')
  .post(validate(createCategorySchema), createCategory)
  .get(getCategories);

router.route('/:id')
  .get(getCategoryById)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(deleteCategory);

export default router;
