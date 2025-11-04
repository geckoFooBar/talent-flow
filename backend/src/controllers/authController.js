import Organization from "../models/Org.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { getTenantConnection } from "../config/tenantDB.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Step 1: find org where this email is adminEmail
    const org = await Organization.findOne({ adminEmail: email });
    if (org) {
      const valid = await bcrypt.compare(password, org.adminPassword);
      if (!valid) return res.status(400).json({ message: "Invalid credentials" });

      const userPayload = { email: org.adminEmail, role: "admin", orgId: org.orgId };
      const token = generateToken(userPayload);

      return res.json({
        message: "Login successful",
        token,
        user: { name: "Admin", email: org.adminEmail, role: "admin", orgId: org.orgId, orgName: org.orgName }
      });
    }

    const orgs = await Organization.find({});
    for (const o of orgs) {
      try {
        const tenantConn = await getTenantConnection(o.orgId);
        const User = tenantConn.model("User", new mongoose.Schema({
          name: String,
          email: String,
          password: String,
          role: String
        }));
        const user = await User.findOne({ email });
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          if (!match) continue;
          const payload = { id: user._id, email: user.email, role: user.role, orgId: o.orgId };
          const token = generateToken(payload);
          return res.json({
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email, role: user.role, orgId: o.orgId, orgName: o.orgName }
          });
        }
      } catch (err) {
        // ignore tenant errors for other orgs
      }
    }

    return res.status(400).json({ message: "User not found" });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
