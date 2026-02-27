import { Router } from "express";
import PlansController from "./app/controllers/PlansController.js";
import UsersController from "./app/controllers/UsersController.js";
import SessionsController from "./app/controllers/SessionsController.js";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated.js";

const router = Router();

router.post("/users", UsersController.store);
router.post("/sessions", SessionsController.store);

router.use(ensureAuthenticated);

router.get("/users", UsersController.index);
router.put("/users", UsersController.update);

router.get("/plans", PlansController.index);
router.post("/plans", PlansController.store);
router.put("/plans/:id", PlansController.update);
router.put("/plans/:id", PlansController.update);
router.delete("/plans/:id", PlansController.delete);

export default router;
