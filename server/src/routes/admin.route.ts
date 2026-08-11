import { categoryController } from "../controllers/categroy.controller";
import { auth_middleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import categoryRouter from "./category.route";

/**
 * @access private
 * @description only admin
 */

// create category
categoryRouter.post("/", auth_middleware, roleMiddleware("admin"), categoryController.createCategory);

// update category
categoryRouter.put("/:slug", auth_middleware, roleMiddleware("admin"), categoryController.updateCategory);

// delete category
categoryRouter.delete("/:slug", auth_middleware, roleMiddleware("admin"), categoryController.deleteCategory);

