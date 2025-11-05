import { useState, useEffect } from "react";
//import { motion, AnimatePresence } from "framer-motion";
import { employees as listOfEmployees } from "../data/employees";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_URL;

export default function DirectoryPage() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const token = localStorage.getItem("token");

  const canModify = ["admin", "hr", "manager"].includes(currentUser.role);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddEmployee = () => {
    setEditMode(false);
    setFormData({ name: "", email: "", password: "", role: "employee" });
    setShowModal(true);
  };

  const handleEdit = (emp) => {
    if (!canModify) return;
    setEditMode(true);
    setSelectedEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      password: "",
      role: emp.role,
    });
    setShowModal(true);
  };

  const org = JSON.parse(localStorage.getItem("currentOrg") || "null");

  const fetchEmployees = async () => {
    if (!org) {
      setEmployees(listOfEmployees || []);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/employees/${org.orgId}`, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch employees");
        } else {
          const text = await res.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned non-JSON response");
        }
      }

      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("fetchEmployees error:", err);
      alert("Error fetching employees: " + err.message);
      setEmployees(listOfEmployees || []);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!org) return alert("No organization found!");

    const url =
      editMode && selectedEmployee
        ? `${API_BASE}/api/employees/${selectedEmployee._id}`
        : `${API_BASE}/api/employees/add`;

    const method = editMode && selectedEmployee ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          orgId: org.orgId,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const err = await res.json();
          throw new Error(err.message || "Save failed");
        } else {
          const text = await res.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned non-JSON response when saving");
        }
      }

      const data = await res.json();
      toast.success(editMode ? "Employee updated!" : "Employee added!");
      setShowModal(false);
      setFormData({ name: "", email: "", password: "", role: "employee" });
      setEditMode(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("handleSubmit error:", error);
      alert("Server error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/employees/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const err = await res.json();
          throw new Error(err.message || "Delete failed");
        } else {
          const text = await res.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned non-JSON response when deleting");
        }
      }

      toast.success("🗑️ Employee deleted");
      fetchEmployees();
    } catch (error) {
      console.error("handleDelete error:", error);
      alert("Server error: " + error.message);
    }
  };

  const handleView = (emp) => {
    setSelectedEmployee(emp);
  };

  const closeModal = () => setSelectedEmployee(null);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Directory</h1>
        {canModify && (
          <button
            onClick={handleAddEmployee}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Employee
          </button>
        )}
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <div
            key={emp._id || emp.email}
            className={`p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer ${
              canModify ? "hover:bg-blue-50" : ""
            }`}
          >
            <h3 className="font-semibold text-gray-800">{emp.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{emp.position}</p>
            <p className="text-sm text-gray-400">{emp.email}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleView(emp)}
                className="text-green-600 hover:underline"
              >
                View
              </button>
              {canModify && (
                <button
                  onClick={() => handleEdit(emp)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
              {canModify && (
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative"
            >
              <button
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                {editMode ? "Edit Employee" : "Add New Employee"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded-lg px-3 py-2"
                  type="email"
                  required
                  disabled={editMode}
                />
                {!editMode && (
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border rounded-lg px-3 py-2"
                    type="password"
                    required
                  />
                )}
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editMode ? "Update Employee" : "Save Employee"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-600"
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Employee Details
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Name:</strong> {selectedEmployee.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEmployee.email}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {selectedEmployee.position || "N/A"}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {selectedEmployee.department || "N/A"}
                </p>
                <p>
                  <strong>Role:</strong> {selectedEmployee.role}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEmployee.status || "Active"}
                </p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {selectedEmployee.createdAt
                    ? new Date(selectedEmployee.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
