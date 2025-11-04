import Organization from "../models/Org.js";
import bcrypt from "bcryptjs";
import { getTenantConnection } from "../config/tenantDB.js";
import mongoose from "mongoose";

export const registerOrganization = async (req, res) => {
  try {
    const { orgName, adminEmail, adminPassword } = req.body;
    if (!orgName || !adminEmail || !adminPassword)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await Organization.findOne({ adminEmail });
    if (exists) return res.status(400).json({ message: "Organization/admin exists" });

    const hashed = await bcrypt.hash(adminPassword, 10);
    const orgId = Date.now().toString(); // simple unique id (use UUID in production)
    const orgSlug = orgName.toLowerCase().replace(/\s+/g, "-");

    const org = await Organization.create({
      orgName,
      orgSlug,
      adminEmail,
      adminPassword: hashed,
      orgId
    });

    // Create tenant DB and seed admin user in tenant
    const tenantConn = await getTenantConnection(orgId);

    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: String
    });
    const User = tenantConn.model("User", userSchema);

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashed,
      role: "admin"
    });

    return res.status(201).json({ message: "Organization registered", orgId, orgSlug });
  } catch (err) {
    console.error("registerOrganization:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
