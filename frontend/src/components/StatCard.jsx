import Card from './Card'

export default function StatCard({ title, value, icon, color }) {
  return (
    <Card>
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color.bg}`}>
          <div className={`w-6 h-6 ${color.text}`}>{icon}</div>
        </div>
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </Card>
  )
}
