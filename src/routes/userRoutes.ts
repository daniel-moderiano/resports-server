import {
  getSavedChannelsController,
  addSavedChannelController,
  deleteSavedChannelController,
  addUserController,
  deleteUserController,
} from "@/controllers/userControllers";
import { checkJwt } from "@/middleware/checkJwtMiddleware";
import express from "express";

const router = express.Router();

// Base path /api/users

// TODO: Create controllers for these routes
// User should send requests with appropriate access token, enabling us to access routes
// For user delete, we will likely need to get a management API access token. Use deleteAuth0User function from `resports-aws-cdk` for this if needed
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
