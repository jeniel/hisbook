import { useState } from 'react'
import { Calendar, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CutoffPeriod,
  getAvailableCutoffPeriods,
  getCurrentCutoffPeriod,
} from '../utils/cutoffUtils'

interface CutoffSelectorProps {
  onPeriodSelect: (period: CutoffPeriod) => void
  loading: boolean
  disabled: boolean
}

export function CutoffSelector({
  onPeriodSelect,
  loading,
  disabled,
}: CutoffSelectorProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<CutoffPeriod | null>(
    null
  )
  const availablePeriods = getAvailableCutoffPeriods(12) // Last 12 months
  const currentPeriod = getCurrentCutoffPeriod()

  const handlePeriodChange = (value: string) => {
    const period = availablePeriods.find(
      (p) => `${p.year}-${p.month}-${p.cutoffNumber}` === value
    )
    if (period) {
      setSelectedPeriod(period)
    }
  }

  const handleGetAttendance = () => {
    if (selectedPeriod) {
      onPeriodSelect(selectedPeriod)
    }
  }

  const handleGetCurrentPeriod = () => {
    setSelectedPeriod(currentPeriod)
    onPeriodSelect(currentPeriod)
  }

  return (
    <Card>
      <CardContent className='space-y-4'>
        <h2 className='flex items-center gap-2'>
          <Calendar className='h-8 w-8 text-red-500' />
          <p className='text-xl'>Select Cutoff Period</p>
        </h2>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Choose Period</label>
          <Select
            value={
              selectedPeriod
                ? `${selectedPeriod.year}-${selectedPeriod.month}-${selectedPeriod.cutoffNumber}`
                : ''
            }
            onValueChange={handlePeriodChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a cutoff period' />
            </SelectTrigger>
            <SelectContent>
              {availablePeriods.map((period) => (
                <SelectItem
                  key={`${period.year}-${period.month}-${period.cutoffNumber}`}
                  value={`${period.year}-${period.month}-${period.cutoffNumber}`}
                >
                  <div className='flex flex-col'>
                    <span className='font-medium'>{period.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPeriod && (
          <div className='rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-zinc-900'>
            <div className='text-sm'>
              <p className='font-medium'>{selectedPeriod.label}</p>
              <p className='text-blue-500'>
                {new Date(selectedPeriod.startDate).toLocaleDateString(
                  'en-US',
                  {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }
                )}{' '}
                -{' '}
                {new Date(selectedPeriod.endDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        )}

        <div className='flex flex-col gap-2 md:flex-row'>
          <Button
            onClick={handleGetCurrentPeriod}
            disabled={disabled || loading}
            variant='outline'
            className='flex-1'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Current Period
          </Button>

          <Button
            onClick={handleGetAttendance}
            disabled={disabled || loading || !selectedPeriod}
            className='flex-1'
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                <Calendar className='mr-2 h-4 w-4' />
                Get Attendance
              </>
            )}
          </Button>
        </div>

        <div className='text-muted-foreground text-xs'>
          <p>
            <strong>Cutoff Info:</strong>
          </p>
          <p>• 1st Cutoff: 11th - 25th of the month</p>
          <p>• 2nd Cutoff: 26th - 10th of next month</p>
        </div>
      </CardContent>
    </Card>
  )
}
