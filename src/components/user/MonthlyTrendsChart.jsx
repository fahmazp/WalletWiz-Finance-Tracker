import { useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function MonthlyChart({ transactions = [] }) {
const chartData = useMemo(() => {
    if (!transactions.length) return []

    const monthlyTotals = {}

    transactions.forEach((t) => {
      const date = new Date(t.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyTotals[key]) {
        monthlyTotals[key] = { 
          month: key, 
          income: 0, 
          expense: 0,
          label: date.toLocaleString("default", { month: "short", year: "numeric" })
        }
      }

      if (t.type === "income") {
        monthlyTotals[key].income += Number(t.amount)
      } else if (t.type === "expense") {
        monthlyTotals[key].expense += Number(t.amount)
      }
    })

    const sorted = Object.values(monthlyTotals).sort(
      (a, b) => new Date(a.month + "-01") - new Date(b.month + "-01")
    )

    return sorted
  }, [transactions])

  return (
    <div className="p-4 border rounded-lg bg-secondary shadow-sm">
      <h3 className="text-sm  font-medium mb-4">
        Monthly Income vs Expense
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#dc2626" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
