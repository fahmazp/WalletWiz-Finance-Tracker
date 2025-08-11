import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TrendingDown, TrendingUp, User, Wallet } from "lucide-react"
import toast from "react-hot-toast"

import TransactionForm from "@/components/user/TransactionForm"
import MonthlyAverages from "@/components/user/AverageStats"
import TransactionsTable from "@/components/user/TransactionsTable"
import MonthlyChart from "@/components/user/MonthlyTrendsChart"
import ExpensesPieChart from "@/components/user/PieChart"
import useScrollToHash from "@/hooks/useScroll"


export default function DashboardPage() {

  useScrollToHash();

  const navigate = useNavigate()

  // current user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null
    } catch {
      return null
    }
  })

  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("transactions")) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    }
  }, [currentUser, navigate])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    toast.success("Logged out successfully! 👋")
    navigate("/")
  }

  // Add 
  const addTransaction = (data) => {
    const newTransaction = {
      id: Date.now(),
      ...data,
      date: data?.date
        ? data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : String(data.date)
        : new Date().toISOString().split("T")[0],
      amount: Number(data.amount || 0),
      notes: data.notes ?? data.description ?? "",
    }

    const updated = [newTransaction, ...transactions]
    setTransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))
    toast.success("Transaction added !")
  }

  // Edit
  const editTransaction = (id, updatedData) => {
    const updatedList = transactions.map((t) =>
      t.id === id
        ? {
            ...t,
            ...updatedData,
            date: updatedData?.date
              ? updatedData.date instanceof Date
                ? updatedData.date.toISOString().split("T")[0]
                : String(updatedData.date)
              : t.date,
            amount: Number(updatedData.amount || t.amount || 0),
            notes: updatedData.notes ?? updatedData.description ?? t.notes ?? "",
          }
        : t
    )
    setTransactions(updatedList)
    localStorage.setItem("transactions", JSON.stringify(updatedList))
    toast.success("Transaction updated !")
  }

  // Delete
  const deleteTransaction = (id) => {
    const updatedList = transactions.filter((t) => t.id !== id)
    setTransactions(updatedList)
    localStorage.setItem("transactions", JSON.stringify(updatedList))
    toast.success("Transaction deleted ")
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

  const totalBalance = totalIncome - totalExpense

  if (!currentUser) return null

  return (
    <main className="min-h-screen p-6 pt-24">

      <section id="overview">

      <div className="flex items-center justify-between flex-col md:flex-row mt-4 lg:mt-2 mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <h1 className="text-lg sm:text-2xl font-medium">Welcome, {currentUser?.email || currentUser?.name}</h1>
          <User strokeWidth="2.5" className="w-6 h-6 text-green-600" />
        </div>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-sm text-foreground mb-1 flex items-center gap-1">
              <Wallet strokeWidth="2.5" className="w-5 text-foreground" />
              Total Balance</h2>
            <p className="text-xl font-semibold">₹{totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-sm text-foreground mb-1 flex">Income
              <TrendingUp strokeWidth="2.5" className="ml-1 w-5 text-green-600" />
            </h2>
            <p className="text-xl font-semibold text-green-600">₹{totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-sm text-foreground mb-1 flex">Expenses
              <TrendingDown strokeWidth="2.5" className="ml-1 w-5 text-red-500" />
            </h2>
            <p className="text-xl font-semibold text-red-500">₹{totalExpense.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <div>
          <MonthlyAverages transactions={transactions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-2">
        <MonthlyChart transactions={transactions} />
        <ExpensesPieChart transactions={transactions} />
      </div>

    </section>

      <section id="transactions" className="pt-10 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="md:text-lg font-semibold mb-2">Transaction History</h2>
          <TransactionForm onAddTransaction={addTransaction} />
        </div>
        <Separator className="bg-green-500 mb-4" />
        <TransactionsTable
          transactions={transactions}
          setTransactions={setTransactions}
          onEdit={editTransaction}
          onDelete={deleteTransaction}
        />
      </section>

    </main>
  )
}
