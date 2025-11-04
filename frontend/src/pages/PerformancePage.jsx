import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts'


export default function PerformancePage() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      {/* Attendance Trend */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Attendance Trend (Past 10 Months)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={[
              { month: "Jan", rate: 78 },
              { month: "Feb", rate: 85 },
              { month: "Mar", rate: 81 },
              { month: "Apr", rate: 89 },
              { month: "May", rate: 93 },
              { month: "Jun", rate: 95 },
              { month: "Jul", rate: 89 },
              { month: "Aug", rate: 90 },
              { month: "Sep", rate: 92 }, 
              { month: "Oct", rate: 86 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Performance Scores by Department
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { dept: "HR", score: 82 },
              { dept: "Finance", score: 87 },
              { dept: "IT", score: 91 },
              { dept: "Marketing", score: 85 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="dept" />
            <YAxis domain={[50, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
