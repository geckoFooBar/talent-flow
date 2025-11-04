import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  orgSlug: { type: String, required: true, unique: true },
  adminEmail: { type: String, required: true, unique: true },
  adminPassword: { type: String, required: true },
  orgId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Organization", OrgSchema);
