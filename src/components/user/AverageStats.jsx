import { useMemo } from "react"

export default function MonthlyAverages({ transactions = [] }) {
  const { avgIncome, avgExpense } = useMemo(() => {
    if (!transactions.length) return { avgIncome: 0, avgExpense: 0 }

    const monthlyIncomeTotals = {}
    const monthlyExpenseTotals = {}

    transactions.forEach((t) => {
      const date = new Date(t.date)
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`

      if (t.type === "income") {
        if (!monthlyIncomeTotals[key]) monthlyIncomeTotals[key] = 0
        monthlyIncomeTotals[key] += Number(t.amount)
      } else if (t.type === "expense") {
        if (!monthlyExpenseTotals[key]) monthlyExpenseTotals[key] = 0
        monthlyExpenseTotals[key] += Number(t.amount)
      }
    })

    const totalIncome = Object.values(monthlyIncomeTotals).reduce((sum, amt) => sum + amt, 0)
    const totalExpense = Object.values(monthlyExpenseTotals).reduce((sum, amt) => sum + amt, 0)

    const incomeMonths = Object.keys(monthlyIncomeTotals).length
    const expenseMonths = Object.keys(monthlyExpenseTotals).length

    return {
      avgIncome: incomeMonths > 0 ? (totalIncome / incomeMonths).toFixed(2) : 0,
      avgExpense: expenseMonths > 0 ? (totalExpense / expenseMonths).toFixed(2) : 0,
    }
  }, [transactions])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-6">
      <div className="p-4 rounded-lg border bg-secondary ring ring-green-400 shadow-sm">
        <h3 className="text-sm font-medium">Avg Income / Month</h3>
        <p className="text-base lg:text-xl font-semibold text-green-600">₹{avgIncome}</p>
      </div>
      <div className="p-4 rounded-lg border bg-secondary ring ring-red-400 shadow-sm">
        <h3 className="text-sm font-medium">Avg Expense / Month</h3>
        <p className="text-base lg:text-xl font-semibold text-red-500">₹{avgExpense}</p>
      </div>
    </div>
  )
}
