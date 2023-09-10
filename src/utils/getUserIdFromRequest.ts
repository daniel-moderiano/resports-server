import { Request } from "express-jwt";

/**
 * Retrieves the user ID from the authentication object of the request.
 *
 * @param request - The Express request object modified by `express-jwt`.
 * @returns - The user ID extracted from the authentication object.
 * @throws - If the user ID cannot be accessed.
 */
export const getUserIdFromRequest = (request: Request) => {
  const userId = request.auth?.sub;

  if (!userId) {
    throw new Error("Unable to access user ID");
  }

  return userId;
};
