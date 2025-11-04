import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { withTenant } from "../middleware/tenantMiddleware.js";
import { addPerformance, getPerformance } from "../controllers/performanceController.js";

const router = express.Router();

router.get("/", verifyToken, withTenant, getPerformance);
router.post("/", verifyToken, withTenant, addPerformance);

export default router;
