/**
 * API routes.
 * Base path /api/users
 */

import {
  addSavedChannelController,
  addUserController,
  deleteSavedChannelController,
  deleteUserController,
  getSavedChannelsController,
} from "../controllers";
import { checkJwt } from "../middleware/checkJwtMiddleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(checkJwt, addUserController)
  .delete(checkJwt, deleteUserController);

router
  .route("/saved-channels")
  .get(checkJwt, getSavedChannelsController)
  .post(checkJwt, addSavedChannelController);
router
  .route("/saved-channels/:channelId")
  .delete(checkJwt, deleteSavedChannelController);

export default router;
