import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TransactionForm from "@/components/user/TransactionForm"
import { Pencil, Trash2 } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input" // For search box

export default function TransactionsTable({ transactions = [], setTransactions, onEdit, onDelete }) {
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Filters & sorting
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category))
    return Array.from(cats)
  }, [transactions])

  const filteredAndSorted = useMemo(() => {
    let data = [...transactions]

    // Filter by type
    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter)
    }

    // Filter by category
    if (categoryFilter !== "all") {
      data = data.filter((t) => t.category === categoryFilter)
    }

    // Search
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      data = data.filter(
        (t) =>
          t.notes?.toLowerCase().includes(term) ||
          t.category?.toLowerCase().includes(term) ||
          t.type?.toLowerCase().includes(term) ||
          String(t.amount).includes(term) ||
          t.date?.toLowerCase().includes(term)
      )
    }

    // Sort
    if (sortBy === "amount-asc") {
      data.sort((a, b) => Number(a.amount) - Number(b.amount))
    } else if (sortBy === "amount-desc") {
      data.sort((a, b) => Number(b.amount) - Number(a.amount))
    } else if (sortBy === "date-asc") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortBy === "date-desc") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return data
  }, [transactions, typeFilter, categoryFilter, sortBy, searchTerm])

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction)
    setEditOpen(true)
  }

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      if (typeof onDelete === "function") onDelete(id)
    }
  }

  return (
    <>
      {/* Filters, Sorting, Search */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Select onValueChange={setTypeFilter} value={typeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Types</SelectItem>
            <SelectItem value="income" className="text-xs">Income</SelectItem>
            <SelectItem value="expense" className="text-xs">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setCategoryFilter} value={categoryFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-xs">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc" className="text-xs">Date: Newest First</SelectItem>
            <SelectItem value="date-asc" className="text-xs">Date: Oldest First</SelectItem>
            <SelectItem value="amount-desc" className="text-xs">Amount: High to Low</SelectItem>
            <SelectItem value="amount-asc" className="text-xs">Amount: Low to High</SelectItem>
          </SelectContent>
        </Select>

        {/* Search box */}
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px]"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>₹{t.amount}</TableCell>
                  <TableCell className={t.type === "income" ? "text-green-600" : "text-red-500"}>
                    {t.type}
                  </TableCell>
                  <TableCell className="capitalize">{t.category}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.notes || "-"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(t)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteClick(t.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No transactions yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog: controlled TransactionForm */}
      {selectedTransaction && (
        <TransactionForm
          mode="edit"
          defaultValues={selectedTransaction}
          triggerButton={false}
          open={editOpen}
          onOpenChange={setEditOpen}
          onAddTransaction={(formData) => {
            if (typeof onEdit === "function") {
              onEdit(selectedTransaction.id, formData)
            }
            setEditOpen(false)
            setSelectedTransaction(null)
          }}
        />
      )}
    </>
  )
}
