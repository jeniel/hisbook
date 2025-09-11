import React from 'react'
import { IconTimeDuration30 } from '@tabler/icons-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceCard } from './components/attendance-card'
import { AttendanceSummary } from './components/attendance-summary'
import { CutoffSelector } from './components/cutoff-selector'
import { Information } from './components/information'
import { LoadingCard } from './components/loading-card'
import { useAttendance } from './hooks'
import { CutoffPeriod } from './utils/cutoffUtils'

const AttendancePage = () => {
  const {
    user,
    attendanceData,
    loadingAttendance,
    hasUser,
    hasAttendanceData,
    canFetchAttendance,
    fetchUser,
    fetchAttendanceLogs,
  } = useAttendance()

  const [selectedPeriod, setSelectedPeriod] =
    React.useState<CutoffPeriod | null>(null)

  const handlePeriodSelect = async (period: CutoffPeriod) => {
    setSelectedPeriod(period)
    await fetchAttendanceLogs(period.startDate, period.endDate)
  }

  return (
    <div className='space-y-4'>
      <div className='mb-4'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <IconTimeDuration30 className='h-10 w-10 text-red-500' />
            Employee Attendance
          </h1>
          <p className='text-muted-foreground text-sm'>
            Please input your Employee Id in the Profile.
          </p>
        </div>
      </div>

      <div className='space-y-4'>
          {/* User Search Section */}
          <Information user={user} fetchUser={fetchUser} />

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
      </div>
    </div>
  )
}

export default AttendancePage
