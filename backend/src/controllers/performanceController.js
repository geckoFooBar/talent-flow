import mongoose from "mongoose";

const ensurePerformanceModel = (conn) => {
  if (!conn.models.Performance) {
    const schema = new mongoose.Schema({
      email: String,
      kpi: String,
      rating: Number,
      notes: String,
      createdAt: { type: Date, default: Date.now }
    });
    conn.model("Performance", schema);
  }
  return conn.model("Performance");
};

export const addPerformance = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Performance = ensurePerformanceModel(conn);
    const rec = await Performance.create(req.body);
    return res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPerformance = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Performance = ensurePerformanceModel(conn);
    const rows = await Performance.find({}).sort({ createdAt: -1 });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
