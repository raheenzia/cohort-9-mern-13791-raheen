import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";
import httpLogger from "./src/middleware/logger.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import noteRoutes from "./src/routes/note.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(httpLogger);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Pastel Notes API is running" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error, "Server startup failed");
    process.exit(1);
  }
};

startServer();

