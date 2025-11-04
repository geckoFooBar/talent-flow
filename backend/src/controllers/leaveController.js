import mongoose from "mongoose";

const ensureLeaveModel = (conn) => {
  if (!conn.models.Leave) {
    const schema = new mongoose.Schema({
      email: String,
      from: String,
      to: String,
      reason: String,
      status: { type: String, default: "Pending" },
      createdAt: { type: Date, default: Date.now }
    });
    conn.model("Leave", schema);
  }
  return conn.model("Leave");
};

export const applyLeave = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Leave = ensureLeaveModel(conn);
    const rec = await Leave.create(req.body);
    return res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Leave = ensureLeaveModel(conn);
    const rows = await Leave.find({}).sort({ createdAt: -1 });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Leave = ensureLeaveModel(conn);
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    return res.json(leave);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
