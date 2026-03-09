import { Router } from "express";
import express from "express";

import PlansController from "./app/controllers/PlansController.js";
import UsersController from "./app/controllers/UsersController.js";
import SessionsController from "./app/controllers/SessionsController.js";
import SubscriptionController from "./app/controllers/SubscriptionController.js";
import StripeWebhookController from "./app/controllers/StripeWebhookController.js";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated.js";
import { ensureSubscribed } from "./middlewares/ensureSubscribed.js";
import { validate } from "./middlewares/validateRequest.js";
import {
    createUserSchema,
    updateUserSchema,
} from "./validators/UserValidator.js";
import { createPlanSchema } from "./validators/PlanValidator.js";
import { createSessionSchema } from "./validators/SessionValidator.js";

const router = Router();

router.post("/sessions", validate(createSessionSchema), SessionsController.store);
router.post("/users", validate(createUserSchema), UsersController.store);

router.post(
    "/webhooks/stripe",
    express.raw({ type: "application/json" }),
    StripeWebhookController.handle,
);

router.use(ensureAuthenticated);

router.get("/users", UsersController.index);
router.put(
    "/users",
    ensureAuthenticated,
    validate(updateUserSchema),
    UsersController.update,
);

router.get("/plans", PlansController.index);
router.post(
    "/plans",
    ensureAuthenticated,
    validate(createPlanSchema),
    PlansController.store,
);
router.put(
    "/plans/:id",
    ensureAuthenticated,
    validate(createPlanSchema.partial()),
    PlansController.update,
);
router.delete("/plans/:id", PlansController.delete);

router.post("/subscriptions", SubscriptionController.store);
router.get("/subscriptions/me", SubscriptionController.show);

router.get("/premium-content", ensureSubscribed, (req, res) => {
    return res.json({
        message: "Bem-vindo à área VIP! Você tem uma assinatura ativa.",
    });
});

export default router;
