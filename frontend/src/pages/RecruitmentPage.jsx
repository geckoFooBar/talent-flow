import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { useState } from 'react'

export default function RecruitmentPage({ candidates, onAddCandidate }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', position: '', stage: 'Sourced' })

  const stages = ['Sourced', 'Interviewing', 'Offer', 'Hired']

  const handleSubmit = e => {
    e.preventDefault()
    onAddCandidate(form)
    setForm({ name: '', position: '', stage: 'Sourced' })
    setShowForm(false)
  }

  return (
    <div>
      <PageHeader title="Recruitment Pipeline">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 transition"
        >
          Add Candidate
        </button>
      </PageHeader>

      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Candidate Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Position"
              value={form.position}
              onChange={e => setForm({ ...form, position: e.target.value })}
              required
              className="border p-2 w-full rounded"
            />
            <select
              value={form.stage}
              onChange={e => setForm({ ...form, stage: e.target.value })}
              className="border p-2 w-full rounded"
            >
              {stages.map(stage => (
                <option key={stage}>{stage}</option>
              ))}
            </select>
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map(stage => (
          <div key={stage} className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-4">{stage}</h3>
            <div className="space-y-4">
              {candidates.filter(c => c.stage === stage).map(candidate => (
                <Card key={candidate.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full" src={candidate.avatar} alt={candidate.name} />
                    <div>
                      <p className="font-semibold text-slate-800">{candidate.name}</p>
                      <p className="text-xs text-slate-500">{candidate.position}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
