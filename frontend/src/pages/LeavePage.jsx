import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { useState } from 'react'

export default function LeavePage({ leaveRequests, employees, onApplyLeave }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ type: '', startDate: '', endDate: '', reason: '' })

  const getStatusChip = status => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-800'
      case 'Pending': return 'bg-amber-100 text-amber-800'
      case 'Denied': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    onApplyLeave(form)
    setShowForm(false)
    setForm({ type: '', startDate: '', endDate: '', reason: '' })
  }

  return (
    <div>
      <PageHeader title="Leave Management">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 transition"
        >
          Apply for Leave
        </button>
      </PageHeader>

      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Leave Type"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm({ ...form, endDate: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
            <textarea
              placeholder="Reason"
              value={form.reason}
              onChange={e => setForm({ ...form, reason: e.target.value })}
              className="border p-2 w-full rounded"
              required
            />
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </Card>
      )}

      <Card>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Leave History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(req => {
                const emp = employees.find(e => e.id === req.employeeId)
                return (
                  <tr key={req.id} className="bg-white border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{emp?.name}</td>
                    <td className="px-6 py-4">{req.type}</td>
                    <td className="px-6 py-4">{req.startDate} to {req.endDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChip(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
