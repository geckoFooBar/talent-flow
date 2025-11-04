import { getTenantConnection } from "../config/tenantDB.js";
import mongoose from "mongoose";

export const withTenant = async (req, res, next) => {
  try {
    const orgId = req.user?.orgId || req.params.orgId || req.body.orgId;
    if (!orgId) return res.status(400).json({ message: "orgId missing" });

    const conn = await getTenantConnection(orgId);
    req.tenantConn = conn;

    // ensure models are available on connection - define if not exists
    if (!conn.models.User) {
      const userSchema = new mongoose.Schema({
        name: String,
        email: { type: String, unique: true },
        password: String,
        role: { type: String, enum: ["admin", "hr", "manager", "employee"], default: "employee" }
      });
      conn.model("User", userSchema);
    }

    if (!conn.models.Employee) {
      const employeeSchema = new mongoose.Schema({
        name: String,
        email: String,
        position: String,
        department: String,
        status: String,
        createdAt: { type: Date, default: Date.now }
      });
      conn.model("Employee", employeeSchema);
    }

    next();
  } catch (err) {
    console.error("tenant middleware error:", err);
    return res.status(500).json({ message: "Tenant connection failed" });
  }
};
