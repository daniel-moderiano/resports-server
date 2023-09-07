import express from "express";
// import { requiresAuth } from "express-openid-connect";

const router = express.Router();

// Base path /api/users

// TODO: Create controllers for these routes
// User should send requests with appropriate access token, enabling us to access routes
// For user delete, we will likely need to get a management API access token. Use deleteAuth0User function from `resports-aws-cdk` for this if needed
router.route("/");
// .post(requiresAuth(), getAccessToken, addUser)
// .delete(requiresAuth(), getAccessToken, deleteUser)

router.route("/saved-channels");
// .get(requiresAuth(), getUserSavedChannels)
// .post(requiresAuth(), addSavedChannel);
router.route("/saved-channels/:channelId");
// .delete(requiresAuth(), deleteSavedChannel);

export default router;
