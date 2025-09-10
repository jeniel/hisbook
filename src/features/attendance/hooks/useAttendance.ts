/* eslint-disable no-console */
import { useState, useCallback, useMemo } from 'react'
import { toast } from 'sonner'

export interface Department {
  id: string
  departmentName: string
}

export interface HisUser {
  id: string
  fullName: string
  department: Department
}

export interface AttendanceLog {
  date: string
  inTime: string | null
  outTime: string | null
  message: string
  isError: boolean
  isRestDay: boolean
  withNSD: boolean
  isLeave: boolean
  isCustomSchedule: boolean
  isAbsentOnly: boolean
  isHoliday: boolean
  isOvertimeOnly: boolean
  isRestDayOnly: boolean
  undertime: number
  late: number
  hoursAbsent: number
  worked: number
  hoursRegularOvertime: number
  hoursWorkedNSD: number
  workedOIC: number
  hoursRegularOICOvertime: number
  hoursWorkedOICNSD: number
  hoursRestDay: number
  hoursRestDayNSD: number
  hoursRestOvertime: number
  hoursDoubleHoliday: number
  hoursDoubleHolidayNSD: number
  hoursDoubleHolidayOvertime: number
  hoursDoubleHolidayOIC: number
  hoursDoubleHolidayOICNSD: number
  hoursDoubleHolidayOICOvertime: number
  hoursDoubleHolidayAndRestDay: number
  hoursDoubleHolidayAndRestDayOvertime: number
  hoursDoubleHolidayAndRestDayNSD: number
  hoursRegularHoliday: number
  hoursRegularHolidayOvertime: number
  hoursRegularHolidayNSD: number
  hoursRegularHolidayOIC: number
  hoursRegularHolidayOICOvertime: number
  hoursRegularHolidayOICNSD: number
  hoursRegularHolidayAndRestDay: number
  hoursRegularHolidayAndRestDayOvertime: number
  hoursRegularHolidayAndRestDayNSD: number
  hoursSpecialHoliday: number
  hoursSpecialHolidayOvertime: number
  hoursSpecialHolidayNSD: number
  hoursSpecialHolidayOIC: number
  hoursSpecialHolidayOICOvertime: number
  hoursSpecialHolidayOICNSD: number
  hoursSpecialHolidayAndRestDay: number
  hoursSpecialHolidayAndRestDayOvertime: number
  hoursSpecialHolidayAndRestDayNSD: number
  hoursUnallocated: number
  isEmpty: boolean
}

export interface AttendanceData {
  logs: AttendanceLog[]
  totalWorkingHours?: number
  totalDays?: number
}

// Utility functions for date formatting
const formatDateForAPI = (dateString: string): string => {
  // Parse the date string and create UTC date to avoid timezone issues
  const parts = dateString.split('-')
  const year = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1 // Month is 0-indexed
  const day = parseInt(parts[2])

  // Create date in UTC at midnight
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))

  // Return ISO string (already in UTC)
  return date.toISOString()
}

const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const end = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return `${start} - ${end}`
}

// API functions
export const getHisd3User = async (idNumber: string): Promise<HisUser> => {
  try {
    const response = await fetch(
      `https://srv-hismk2.ace-mc-bohol.com/hrm/getEmployeeByIdNumber?id=${idNumber}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching HIS user:', error)
    throw error
  }
}

export const getAttendanceLogs = async (
  startDate: string,
  endDate: string,
  hisUserId: string | null
): Promise<AttendanceData> => {
  try {
    if (!hisUserId) {
      throw new Error('HIS User ID is required')
    }

    const formattedStartDate = formatDateForAPI(startDate)
    const formattedEndDate = formatDateForAPI(endDate)

    const response = await fetch(
      `https://srv-hismk2.ace-mc-bohol.com/hrm/getEmployeeAccumulatedLogs?id=${hisUserId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const logs: AttendanceLog[] = await response.json()

    // Return the logs wrapped in the AttendanceData format
    return {
      logs: logs,
      totalWorkingHours: logs.reduce((sum, log) => sum + log.worked, 0),
      totalDays: logs.filter((log) => !log.isEmpty && log.worked > 0).length,
    }
  } catch (error) {
    console.error('Error fetching attendance logs:', error)
    throw error
  }
}

export function useAttendance() {
  const [user, setUser] = useState<HisUser | null>(null)
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(
    null
  )
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingAttendance, setLoadingAttendance] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch user by ID number
  const fetchUser = useCallback(async (idNumber: string) => {
    if (!idNumber.trim()) {
      toast.error('ID Number is required')
      return null
    }

    setLoadingUser(true)
    setError(null)
    // Clear previous attendance data when fetching new user
    setAttendanceData(null)

    try {
      const userData = await getHisd3User(idNumber)
      setUser(userData)
      return userData
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch user'
      setError(errorMessage)
      toast.error(errorMessage)
      setUser(null)
      return null
    } finally {
      setLoadingUser(false)
    }
  }, [])

  // Fetch attendance logs (requires user to be fetched first)
  const fetchAttendanceLogs = useCallback(
    async (startDate: string, endDate: string, hisUserId?: string) => {
      const userId = hisUserId || user?.id

      if (!userId) {
        toast.error(
          'User must be selected first. Please search for a user using their ID number.'
        )
        return null
      }

      if (!startDate || !endDate) {
        toast.error('Start date and end date are required')
        return null
      }

      setLoadingAttendance(true)
      setError(null)

      try {
        const logs = await getAttendanceLogs(startDate, endDate, userId)
        setAttendanceData(logs)
        toast.success('Attendance logs fetched successfully')
        return logs
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to fetch attendance logs'
        setError(errorMessage)
        toast.error(errorMessage)
        setAttendanceData(null)
        return null
      } finally {
        setLoadingAttendance(false)
      }
    },
    [user?.id]
  )

  // Fetch user and then immediately fetch attendance logs
  const fetchUserAndAttendance = useCallback(
    async (idNumber: string, startDate: string, endDate: string) => {
      if (!idNumber.trim()) {
        toast.error('ID Number is required')
        return null
      }

      if (!startDate || !endDate) {
        toast.error('Start date and end date are required')
        return null
      }

      // First fetch the user
      const userData = await fetchUser(idNumber)

      if (userData?.id) {
        // Then fetch attendance logs using the user's ID
        const attendanceLogs = await fetchAttendanceLogs(
          startDate,
          endDate,
          userData.id
        )
        return { user: userData, attendanceData: attendanceLogs }
      }

      return null
    },
    [fetchUser, fetchAttendanceLogs]
  )

  // Clear all data
  const clearData = useCallback(() => {
    setUser(null)
    setAttendanceData(null)
    setError(null)
  }, [])

  // Reset error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Memoized computed values
  const isLoading = useMemo(
    () => loadingUser || loadingAttendance,
    [loadingUser, loadingAttendance]
  )

  const hasUser = useMemo(() => !!user, [user])

  const hasAttendanceData = useMemo(() => !!attendanceData, [attendanceData])

  // Check if ready to fetch attendance (user is loaded and has ID)
  const canFetchAttendance = useMemo(() => !!user?.id, [user?.id])

  // Format date range for display
  const formatDateRangeDisplay = useCallback(
    (startDate: string, endDate: string) => {
      return formatDateRange(startDate, endDate)
    },
    []
  )

  return useMemo(
    () => ({
      // Data
      user,
      attendanceData,
      error,

      // Loading states
      loadingUser,
      loadingAttendance,
      isLoading,

      // Computed states
      hasUser,
      hasAttendanceData,
      canFetchAttendance,

      // Actions
      fetchUser,
      fetchAttendanceLogs,
      fetchUserAndAttendance,
      clearData,
      clearError,

      // Utilities
      formatDateRange: formatDateRangeDisplay,
    }),
    [
      user,
      attendanceData,
      error,
      loadingUser,
      loadingAttendance,
      isLoading,
      hasUser,
      hasAttendanceData,
      canFetchAttendance,
      fetchUser,
      fetchAttendanceLogs,
      fetchUserAndAttendance,
      clearData,
      clearError,
      formatDateRangeDisplay,
    ]
  )
}
