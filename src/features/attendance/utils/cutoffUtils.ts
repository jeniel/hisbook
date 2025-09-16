// Utility functions for handling cutoff periods

export interface CutoffPeriod {
  label: string
  startDate: string
  endDate: string
  cutoffNumber: number
  month: string
  year: number
}

export const getCutoffPeriods = (year: number, month: number): CutoffPeriod[] => {
  const periods: CutoffPeriod[] = []
  
  // First cutoff: 11th to 25th of the current month
  const firstCutoffStart = new Date(year, month - 1, 11)
  const firstCutoffEnd = new Date(year, month - 1, 26)
  
  periods.push({
    label: `1st Cutoff - ${getMonthName(month)} ${year}`,
    startDate: formatDateForInput(firstCutoffStart),
    endDate: formatDateForInput(firstCutoffEnd),
    cutoffNumber: 1,
    month: getMonthName(month),
    year: year
  })
  
  // Second cutoff: 26th of current month to 10th of next month
  const secondCutoffStart = new Date(year, month - 1, 26)
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const secondCutoffEnd = new Date(nextYear, nextMonth - 1, 11)
  
  periods.push({
    label: `2nd Cutoff - ${getMonthName(month)} ${year}`,
    startDate: formatDateForInput(secondCutoffStart),
    endDate: formatDateForInput(secondCutoffEnd),
    cutoffNumber: 2,
    month: getMonthName(month),
    year: year
  })
  
  return periods
}

export const getCurrentCutoffPeriod = (): CutoffPeriod => {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  
  if (currentDay >= 11 && currentDay <= 25) {
    // We're in the first cutoff
    return getCutoffPeriods(currentYear, currentMonth)[0]
  } else if (currentDay >= 26) {
    // We're in the second cutoff of current month
    return getCutoffPeriods(currentYear, currentMonth)[1]
  } else {
    // We're in the second cutoff of previous month (1st-10th)
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear
    return getCutoffPeriods(prevYear, prevMonth)[1]
  }
}

export const getAvailableCutoffPeriods = (monthsBack: number = 6): CutoffPeriod[] => {
  const periods: CutoffPeriod[] = []
  const today = new Date()
  
  for (let i = 0; i < monthsBack; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    
    const monthPeriods = getCutoffPeriods(year, month)
    periods.push(...monthPeriods)
  }
  
  return periods.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
}

const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[month - 1]
}

const formatDateForInput = (date: Date): string => {
  // Format date without timezone conversion issues
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
  const end = new Date(endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  return `${start} - ${end}`
}
