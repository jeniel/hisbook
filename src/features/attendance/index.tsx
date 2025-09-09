/* eslint-disable no-console */
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceCard } from './components/attendance-card'
import { AttendanceSummary } from './components/attendance-summary'
import { CutoffSelector } from './components/cutoff-selector'
import { LoadingCard } from './components/loading-card'
import { UserSearch } from './components/user-search'
import { useAttendance } from './hooks'
import { CutoffPeriod } from './utils/cutoffUtils'

const AttendancePage = () => {
  const {
    user,
    attendanceData,
    loadingUser,
    loadingAttendance,
    hasUser,
    hasAttendanceData,
    canFetchAttendance,
    fetchUser,
    fetchAttendanceLogs,
    error,
  } = useAttendance()

  const [selectedPeriod, setSelectedPeriod] =
    React.useState<CutoffPeriod | null>(null)

  const handleUserSearch = async (idNumber: string) => {
    console.log('� Searching for user:', idNumber)
    await fetchUser(idNumber)
  }

  console.log('attendanceData', attendanceData)

  const handlePeriodSelect = async (period: CutoffPeriod) => {
    console.log('📅 Fetching attendance for period:', period)
    setSelectedPeriod(period)
    await fetchAttendanceLogs(period.startDate, period.endDate)
  }

  console.log('attendance Mount')

  return (
    <div className='container mx-auto space-y-6 p-6'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>
          Employee Attendance
        </h1>
        <p className='text-gray-600'>
          Search for an employee and view their attendance records by cutoff
          periods.
        </p>
      </div>

      {/* User Search Section */}
      <UserSearch
        onSearch={handleUserSearch}
        loading={loadingUser}
        user={user}
        error={error}
        fetchUser={fetchUser}
      />

      {/* Cutoff Period Selector */}
      {hasUser && (
        <CutoffSelector
          onPeriodSelect={handlePeriodSelect}
          loading={loadingAttendance}
          disabled={!canFetchAttendance}
        />
      )}

      {/* Loading State */}
      {loadingAttendance && (
        <LoadingCard message='Fetching attendance records...' />
      )}

      {/* Attendance Results */}
      {hasAttendanceData && attendanceData && selectedPeriod && user && (
        <Tabs defaultValue='details' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='summary'>Summary</TabsTrigger>
            <TabsTrigger value='details'>Daily Details</TabsTrigger>
          </TabsList>
          <TabsContent value='summary' className='mt-4'>
            <AttendanceSummary
              attendanceData={attendanceData}
              periodLabel={selectedPeriod.label}
            />
          </TabsContent>
          <TabsContent value='details' className='mt-4'>
            <AttendanceCard
              attendanceData={attendanceData}
              periodLabel={selectedPeriod.label}
              employee={user}
            />
          </TabsContent>
        </Tabs>
      )}

      {/* Instructions */}
      {!hasUser && (
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
          <h3 className='mb-2 font-medium text-blue-800'>
            How to use this page:
          </h3>
          <ol className='list-inside list-decimal space-y-1 text-sm text-blue-700'>
            <li>Enter an employee ID number in the search box above</li>
            <li>Click "Search" to find the employee</li>
            <li>Select a cutoff period from the dropdown</li>
            <li>Click "Get Attendance" to view their attendance records</li>
          </ol>

          <div className='mt-4 rounded bg-blue-100 p-3'>
            <p className='text-xs font-medium text-blue-800'>
              Cutoff Period Information:
            </p>
            <p className='text-xs text-blue-700'>
              • <strong>1st Cutoff:</strong> 11th to 25th of the month
              <br />• <strong>2nd Cutoff:</strong> 26th of the month to 10th of
              the next month
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendancePage
