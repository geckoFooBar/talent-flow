export default function PageHeader({ title, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
      <div className="mt-4 md:mt-0">{children}</div>
    </div>
  )
}
