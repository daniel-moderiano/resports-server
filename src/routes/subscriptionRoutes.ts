import express from "express";
import {
  getSubscription,
  addSubscription,
  deleteSubscriptionController,
} from "../controllers/subscriptionControllers";
import { requiresAuth } from "express-openid-connect";

const router = express.Router();

// Base path /api/subscriptions

router.post("/", requiresAuth(), addSubscription);

router.get("/:subscriptionId", requiresAuth(), getSubscription);

router.delete("/:subscriptionId", requiresAuth(), deleteSubscriptionController);

export default router;
