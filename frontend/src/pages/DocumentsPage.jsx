import Card from '../components/Card'
import PageHeader from '../components/PageHeader'

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: 'Employee Handbook.pdf', uploadedBy: 'HR', date: '2025-09-01' },
    { id: 2, name: 'Leave Policy.docx', uploadedBy: 'HR', date: '2025-08-15' },
    { id: 3, name: 'Project Plan.xlsx', uploadedBy: 'Manager', date: '2025-09-20' }
  ]

  return (
    <div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Document</th>
                <th className="px-6 py-3">Uploaded By</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{doc.name}</td>
                  <td className="px-6 py-4">{doc.uploadedBy}</td>
                  <td className="px-6 py-4">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
