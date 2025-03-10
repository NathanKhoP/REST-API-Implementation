import FoodController from '@/controllers/food.controller';
import { authMiddleware } from '@/middleware/auth';
import { Router } from 'express';

const router: Router = Router();

router.get('/', authMiddleware, FoodController.getFoods);
router.get('/:id', authMiddleware, FoodController.getFoodById);
router.post('/', authMiddleware, FoodController.addFood);
router.patch('/:id', authMiddleware, FoodController.modifyFood);
router.delete('/:id', authMiddleware, FoodController.deleteFood);

export default router;