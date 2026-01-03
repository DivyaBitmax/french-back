import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import config from "./config/config.js";
import franchiseRoutes from "./routes/franchiseRoutes.js";
const app = express();

/* ---------------- Middleware ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- DB Connection ---------------- */
connectDB();





app.use("/api/franchise", franchiseRoutes);




/* ---------------- Server ---------------- */
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
