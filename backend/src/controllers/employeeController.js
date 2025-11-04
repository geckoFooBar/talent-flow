import mongoose from "mongoose";

export const getEmployees = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Employee = conn.model("Employee");
    const employees = await Employee.find({});
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Employee = conn.model("Employee");
    const { name, email, position, department, status } = req.body;
    const newEmp = await Employee.create({ name, email, position, department, status: status || "Active" });
    return res.status(201).json(newEmp);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Employee = conn.model("Employee");
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    return res.json(emp);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const conn = req.tenantConn;
    const Employee = conn.model("Employee");
    await Employee.findByIdAndDelete(req.params.id);
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
