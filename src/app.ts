import "dotenv/config";
import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://resports.vercel.app/"],
  })
);

// Allow parsing of form data in req.body for POST and other requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Use routes
app.get("/", (req, res) => res.send("Reached API"));
app.use("/api/users", userRoutes);

// Use error handler AFTER all routes are defined above
app.use(errorHandler);

export default app;
