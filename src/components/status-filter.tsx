import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

type StatusFilterProps = {
  value: string | null
  onChange: (value: string | null) => void
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select
      value={value ?? 'ALL'}
      onValueChange={(v) => onChange(v === 'ALL' ? null : v)}
    >
      <SelectTrigger className="w-[140px] shadow-sm">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All</SelectItem>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="InProgress">In Progress</SelectItem>
        <SelectItem value="OnHold">On Hold</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  )
}
