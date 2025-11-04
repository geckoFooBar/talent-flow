// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------------------------------
// 🔹 MongoDB Connection
// ------------------------------------------------------------
const MONGO_URI = process.env.MONGO_CLUSTER_URI || "mongodb://localhost:27017/talentflow";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------------------------------------------------
// 🔹 Employee Model
// ------------------------------------------------------------
const employeeSchema = new mongoose.Schema({
  orgId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: String,
  department: String,
  role: {
    type: String,
    enum: ["admin", "hr", "manager", "employee"],
    default: "employee",
  },
  status: { type: String, default: "Active" },
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

// ------------------------------------------------------------
// 🔹 Middleware: Verify Token + Role Authorization
// ------------------------------------------------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Missing authorization token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

// ------------------------------------------------------------
// 🔹 Routes
// ------------------------------------------------------------

// ✅ Add New Employee (Admin + HR only)
app.post("/api/employees/add", verifyToken, authorizeRoles("admin", "hr"), async (req, res) => {
  try {
    const { orgId, name, email, password, position, department, role } = req.body;
    if (!orgId || !name || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: "Employee already exists" });

    const emp = await Employee.create({
      orgId,
      name,
      email,
      password,
      position,
      department,
      role: role || "employee",
    });

    res.status(201).json({ message: "Employee added successfully", emp });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Employee
app.post("/api/employees/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emp = await Employee.findOne({ email });
    if (!emp) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: emp._id, role: emp.role, orgId: emp.orgId },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: emp,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all employees (All roles can view)
app.get("/api/employees/:orgId", verifyToken, async (req, res) => {
  try {
    const employees = await Employee.find({ orgId: req.params.orgId });
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update employee (Admin + HR)
app.put("/api/employees/:id", verifyToken, authorizeRoles("admin", "hr"), async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Employee updated", updated });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete employee (Admin + HR)
app.delete("/api/employees/:id", verifyToken, authorizeRoles("admin", "hr"), async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------------------------------------------
// 🔹 Server Start
// ------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
