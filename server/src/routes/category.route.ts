import { Router } from 'express';
import { categoryController } from '../controllers/categroy.controller';

const categoryRouter = Router();

// get all categories
categoryRouter.get("/", categoryController.getAllCategories);

// get category by slug
categoryRouter.get("/:slug", categoryController.getCategoryById);

export default categoryRouter;
