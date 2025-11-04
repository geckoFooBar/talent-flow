import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { withTenant } from "../middleware/tenantMiddleware.js";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// All employee routes require authentication and tenant attach
router.get("/:orgId", verifyToken, withTenant, getEmployees);
router.post("/add", verifyToken, withTenant, addEmployee);
router.put("/:id", verifyToken, withTenant, updateEmployee);
router.delete("/:id", verifyToken, withTenant, deleteEmployee);

export default router;
