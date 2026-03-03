import { Router } from "express";
import PlansController from "./app/controllers/PlansController.js";
import UsersController from "./app/controllers/UsersController.js";
import SessionsController from "./app/controllers/SessionsController.js";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated.js";
import SubscriptionController from "./app/controllers/SubscriptionController.js";

const router = Router();

router.post("/sessions", SessionsController.store);

router.post("/users", UsersController.store);
router.get("/users", UsersController.index);
router.put("/users", UsersController.update);

router.use(ensureAuthenticated);

router.get("/plans", PlansController.index);
router.post("/plans", PlansController.store);
router.put("/plans/:id", PlansController.update);
router.delete("/plans/:id", PlansController.delete);

router.post("/subscriptions", SubscriptionController.store);
router.get("/subscriptions/me", SubscriptionController.show);

export default router;
