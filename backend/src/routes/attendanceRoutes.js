import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { withTenant } from "../middleware/tenantMiddleware.js";
import { addAttendance, getAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", verifyToken, withTenant, getAttendance);
router.post("/", verifyToken, withTenant, addAttendance);

export default router;
