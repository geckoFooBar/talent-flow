import { useState, useEffect } from "react";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AttendancePage({ attendance = {}, employees = [] }) {
  const [attendanceData, setAttendanceData] = useState(attendance);
  const [formData, setFormData] = useState({
    empId: "",
    date: "",
    clockIn: "",
    clockOut: "",
    status: "Present",
  });

  useEffect(() => {
    const stored = localStorage.getItem("attendanceRecords");
    if (stored) {
      setAttendanceData(JSON.parse(stored));
    } else {
      setAttendanceData(attendance);
    }
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceData));
  }, [attendanceData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAttendance = (e) => {
    e.preventDefault();

    if (!formData.empId || !formData.date) {
      toast.error("Please select an employee and a date.");
      return;
    }

    const empId = formData.empId.toString();
    const newRecord = {
      date: formData.date,
      clockIn: formData.clockIn || "09:00 AM",
      clockOut: formData.clockOut || "05:00 PM",
      status: formData.status || "Present",
    };

    setAttendanceData((prev) => {
      const updated = { ...prev };
      if (!updated[empId]) updated[empId] = [];
      updated[empId] = [...updated[empId], newRecord];
      return updated;
    });

    toast.success("Attendance added successfully!");

    setFormData({
      empId: "",
      date: "",
      clockIn: "",
      clockOut: "",
      status: "Present",
    });
  };

  const allRecords = Object.entries(attendanceData).flatMap(([empId, records]) =>
    records.map((r) => {
      const emp = employees.find((e) => e.id.toString() === empId);
      return { ...r, empName: emp?.name };
    })
  );

  const sortedRecords = allRecords.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div>
      <PageHeader title="Attendance Records" />

      <Card>
        <form
          onSubmit={handleAddAttendance}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
        >
          <select
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <input
            type="time"
            name="clockIn"
            value={formData.clockIn}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="time"
            name="clockOut"
            value={formData.clockOut}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">On Leave</option>
          </select>

          <button
            type="submit"
            className="col-span-1 md:col-span-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Attendance
          </button>
        </form>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Clock In</th>
                <th className="px-6 py-3">Clock Out</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((r, i) => (
                <tr
                  key={i}
                  className="bg-white border-b hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">{r.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {r.empName || "—"}
                  </td>
                  <td className="px-6 py-4">{r.clockIn || "—"}</td>
                  <td className="px-6 py-4">{r.clockOut || "—"}</td>
                  <td className="px-6 py-4">{r.status}</td>
                </tr>
              ))}
              {sortedRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-slate-400 py-6 italic"
                  >
                    No attendance records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
