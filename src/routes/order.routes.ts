import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller';
import { validate } from '../middlewares/validate.middleware';
import { createOrderSchema, updateOrderSchema } from '../validators/order.validator';

const router = Router();

router.route('/')
  .post(validate(createOrderSchema), createOrder)
  .get(getOrders);

router.route('/:id')
  .get(getOrderById)
  .put(validate(updateOrderSchema), updateOrder)
  .delete(deleteOrder);

export default router;
