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

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: E-mail ou senha incorretos
 */
router.post("/sessions", validate(createSessionSchema), SessionsController.store);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: E-mail já cadastrado
 */
router.post("/users", validate(createUserSchema), UsersController.store);

router.post(
    "/webhooks/stripe",
    express.raw({ type: "application/json" }),
    StripeWebhookController.handle,
);

router.use(ensureAuthenticated);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/users", UsersController.index);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Atualiza o perfil do usuário logado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               old_password:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.put(
    "/users",
    ensureAuthenticated,
    validate(updateUserSchema),
    UsersController.update,
);

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Lista todos os planos disponíveis
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: Lista de planos
 *   post:
 *     summary: Cria um novo plano (Admin)
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, priceCents, interval]
 *             properties:
 *               name:
 *                 type: string
 *               priceCents:
 *                 type: integer
 *               interval:
 *                 type: string
 *                 enum: [month, year]
 *     responses:
 *       201:
 *         description: Plano criado
 */
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

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Cria uma nova assinatura (Checkout Stripe)
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [planId]
 *             properties:
 *               planId:
 *                 type: string
 *     responses:
 *       201:
 *         description: checkoutUrl para pagamento
 */
router.post("/subscriptions", SubscriptionController.store);

/**
 * @swagger
 * /subscriptions/me:
 *   get:
 *     summary: Exibe a assinatura do usuário atual
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados da assinatura
 */
router.get("/subscriptions/me", SubscriptionController.show);

router.get("/premium-content", ensureSubscribed, (req, res) => {
    return res.json({
        message: "Bem-vindo à área VIP! Você tem uma assinatura ativa.",
    });
});

export default router;
