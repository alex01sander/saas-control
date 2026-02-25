import PlansController from "./app/controllers/PlansController.js";
import { Router } from "express";

const router = Router()

router.get("/plans", PlansController.index);
router.post("/plans", PlansController.store);
router.put("/plans/:id", PlansController.update);

export default router
