import Card from '../components/Card'
import PageHeader from '../components/PageHeader'

export default function ReportsPage() {
  const reports = [
    { id: 1, title: 'Monthly Attendance Report', created: '2025-09-01' },
    { id: 2, title: 'Employee Performance Q3', created: '2025-09-15' },
    { id: 3, title: 'Salary Summary August', created: '2025-08-31' }
  ]

  return (
    <div>
      <PageHeader title="Reports" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map(r => (
          <Card key={r.id}>
            <h3 className="font-semibold text-slate-800">{r.title}</h3>
            <p className="text-sm text-slate-500">Created: {r.created}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Report
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
