import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { withTenant } from "../middleware/tenantMiddleware.js";
import { applyLeave, getLeaves, updateLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", verifyToken, withTenant, getLeaves);
router.post("/", verifyToken, withTenant, applyLeave);
router.patch("/:id/status", verifyToken, withTenant, updateLeaveStatus);

export default router;
