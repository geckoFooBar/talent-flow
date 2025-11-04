import { useState, useEffect } from "react";

export default function AddEmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    status: "Active",
  });

  // Load employees from localStorage
  useEffect(() => {
    const currentOrg = JSON.parse(localStorage.getItem("currentOrg"));
    if (currentOrg && currentOrg.employees) {
      setEmployees(currentOrg.employees);
    }
  }, []);

  // Save to localStorage whenever employees change
  useEffect(() => {
    const currentOrg = JSON.parse(localStorage.getItem("currentOrg"));
    if (currentOrg) {
      currentOrg.employees = employees;
      localStorage.setItem("currentOrg", JSON.stringify(currentOrg));

      const allOrgs = JSON.parse(localStorage.getItem("organizations") || "[]");
      const updatedOrgs = allOrgs.map((org) =>
        org.orgId === currentOrg.orgId ? currentOrg : org
      );
      localStorage.setItem("organizations", JSON.stringify(updatedOrgs));
    }
  }, [employees]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = { id: Date.now().toString(), ...form };
    setEmployees([...employees, newEmployee]);
    setForm({ name: "", position: "", department: "", email: "", status: "Active" });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Employee Management</h1>

      {/* Add Employee Form */}
      <form onSubmit={handleAddEmployee} className="bg-white shadow p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Employee Name"
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Employee
        </button>
      </form>

      {/* Employees Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Position</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No employees added yet.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{emp.name}</td>
                  <td className="p-3 border">{emp.position}</td>
                  <td className="p-3 border">{emp.department}</td>
                  <td className="p-3 border">{emp.email}</td>
                  <td className="p-3 border">{emp.status}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
