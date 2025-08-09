import { useMemo } from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
]

export default function ExpensesPieChart({ transactions = [] }) {
  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense")

    if (!expenses.length) return []

    const totals = {}
    expenses.forEach(t => {
      if (!totals[t.category]) {
        totals[t.category] = 0
      }
      totals[t.category] += Number(t.amount)
    })

    return Object.entries(totals).map(([category, total]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: total
    }))
  }, [transactions])

  return (
    <div className="p-4 border rounded-lg bg-secondary shadow-sm">
      <h3 className="text-sm font-medium mb-4">
        Expense Breakdown by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
