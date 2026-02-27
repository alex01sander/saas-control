import PlansController from "./app/controllers/PlansController.js";
import { Router } from "express";
import UsersController from "./app/controllers/UsersController.js";
import SessionsController from "./app/controllers/SessionsController.js";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated.js";

const router = Router();

router.get("/plans", PlansController.index);
router.post("/plans", PlansController.store);
router.put("/plans/:id", PlansController.update);

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);

router.post("/sessions", SessionsController.store);
router.get("/users", ensureAuthenticated, UsersController.index);

export default router;
