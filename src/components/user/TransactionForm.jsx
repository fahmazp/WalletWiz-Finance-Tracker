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

// Props:
// - onAddTransaction(data) : required (used for add or passed handler in edit to call parent)
// - defaultValues : optional object when editing (fields: amount, type, category, date (string), notes/description)
// - mode: 'add' | 'edit' (default 'add')
// - triggerButton: boolean (default true) - if false, component won't render the Add button (useful for edit where parent controls opening)
// - open (optional) and onOpenChange (optional) -> controlled dialog usage
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

  // internal open state only used if parent does not control dialog
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen === undefined ? internalOpen : controlledOpen
  const setOpen = (val) => {
    if (onOpenChange) onOpenChange(val)
    else setInternalOpen(val)
  }

  // categories
  const incomeCategories = ["Salary", "Gifts", "Misc"]
  const expenseCategories = ["Food", "Transport", "Bills", "Housing and Rent", "Entertainment", "Misc"]

  // watch type and date for UI
  const transactionType = watch("type")
  const watchedDate = watch("date")

  // When dialog opens or defaultValues change, fill form. Only run when `open` toggles or defaultValues change.
  useEffect(() => {
    if (open) {
      if (defaultValues) {
        // map possible field names safely (notes or description)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaultValues, reset])

  const filteredCategories =
    transactionType === "income"
      ? incomeCategories
      : transactionType === "expense"
      ? expenseCategories
      : []

  const onSubmit = (data) => {
    // normalize date and numbers minimally; parent will finalize exact storage format
    const payload = {
      ...data,
      amount: data.amount !== "" ? Number(data.amount) : 0,
      // keep date as Date object if selected; parent will convert to string
      date: data.date ?? null,
      notes: data.notes ?? "",
    }

    if (typeof onAddTransaction === "function") {
      onAddTransaction(payload)
    }

    // close dialog & reset (if uncontrolled)
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
