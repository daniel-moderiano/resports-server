import "dotenv/config";
import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app: Application = express();

// Allow parsing of form data in req.body for POST and other requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use("/api/users", userRoutes);

// Use error handler AFTER all routes are defined above
app.use(errorHandler);

export default app;
