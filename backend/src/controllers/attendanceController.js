import mongoose from "mongoose";

const ensureAttendanceModel = (conn) => {
  if (!conn.models.Attendance) {
    const schema = new mongoose.Schema({
      email: String,
      date: String,
      status: String,
      createdAt: { type: Date, default: Date.now }
    });
    conn.model("Attendance", schema);
  }
  return conn.model("Attendance");
};

export const addAttendance = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Attendance = ensureAttendanceModel(conn);
    const rec = await Attendance.create(req.body);
    return res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Attendance = ensureAttendanceModel(conn);
    const rows = await Attendance.find({}).sort({ createdAt: -1 });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
