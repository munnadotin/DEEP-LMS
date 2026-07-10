import { Router } from 'express';
import { categoryController } from '../controllers/categroy.controller';
import { auth_middleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const categoryRouter = Router();

// create category
categoryRouter.post("/", auth_middleware, roleMiddleware("admin"), categoryController.createCategory);

// get all categories
categoryRouter.get("/", categoryController.getAllCategories);

// get category by slug
categoryRouter.get("/:slug", categoryController.getCategoryById);

// update category
categoryRouter.put("/:slug", auth_middleware, roleMiddleware("admin"), categoryController.updateCategory);

// delete category
categoryRouter.delete("/:slug", auth_middleware, roleMiddleware("admin"), categoryController.deleteCategory);


export default categoryRouter;
