import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"

export default function TransactionForm({
  onAddTransaction,
  defaultValues = null,
  mode = "add",
  triggerButton = true,
  open: controlledOpen,
  onOpenChange,
}) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      amount: "",
      type: "",
      category: "",
      date: null,
      notes: "",
    }
  })

  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen === undefined ? internalOpen : controlledOpen
  const setOpen = (val) => {
    if (onOpenChange) onOpenChange(val)
    else setInternalOpen(val)
  }

  // categories
  const incomeCategories = ["Salary", "Gifts", "Misc"]
  const expenseCategories = ["Food", "Transport", "Bills", "Rent", "Entertainment", "Misc"]

  const transactionType = watch("type")
  const watchedDate = watch("date")

  useEffect(() => {
    if (open) {
      if (defaultValues) {

        const notesVal = defaultValues.notes ?? defaultValues.description ?? ""
        reset({
          amount: defaultValues.amount ?? "",
          type: defaultValues.type ?? "",
          category: defaultValues.category ?? "",
          date: defaultValues.date ? new Date(defaultValues.date) : null,
          notes: notesVal,
        })
      } else {
        // new entry - clear
        reset({
          amount: "",
          type: "",
          category: "",
          date: null,
          notes: "",
        })
      }
    }
  }, [open, defaultValues, reset])

  const filteredCategories =
    transactionType === "income"
      ? incomeCategories
      : transactionType === "expense"
      ? expenseCategories
      : []

  const onSubmit = (data) => {
    const payload = {
      ...data,
      amount: data.amount !== "" ? Number(data.amount) : 0,
      date: data.date ?? null,
      notes: data.notes ?? "",
    }

    if (typeof onAddTransaction === "function") {
      onAddTransaction(payload)
    }

    setOpen(false)
    reset({
      amount: "",
      type: "",
      category: "",
      date: null,
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton && (
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-600 flex items-center">
            <Plus className="w-4 h-4 " />
            {mode === "add" ? "Add Transaction" : "Edit Transaction"}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Transaction" : "Edit Transaction"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Amount */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Amount *</label>
            <Input
              type="number"
              step="0.01"
              {...register("amount", { required: true })}
            />
          </div>

          {/* Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Type *</label>
            <Select
              value={watch("type") || undefined}
              onValueChange={(val) => setValue("type", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category *</label>
            <Select
              value={watch("category") || undefined}
              onValueChange={(val) => setValue("category", val)}
              disabled={!transactionType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((cat) => (
                  <SelectItem key={cat.toLowerCase()} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {watchedDate ? format(watchedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("date")}
                  onSelect={(date) => setValue("date", date)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Notes</label>
            <Textarea {...register("notes")} placeholder="Optional notes..." />
          </div>

          <Button type="submit" className="w-full">
            {mode === "add" ? "Save Transaction" : "Update Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
