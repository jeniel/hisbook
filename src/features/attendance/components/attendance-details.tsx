import { Clock, Moon, Star, Calendar, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceLog } from '../hooks/useAttendance'

interface AttendanceDetailsProps {
  log: AttendanceLog
}

export function AttendanceDetails({ log }: AttendanceDetailsProps) {
  const formatHours = (hours: number) => {
    if (hours === 0) return '0h'
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`
  }

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'N/A'
    try {
      return new Date(timeString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    } catch {
      return timeString
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Group overtime hours by type
  const overtimeHours = [
    { label: 'Regular Overtime', hours: log.hoursRegularOvertime, icon: Clock },
    {
      label: 'Rest Day Overtime',
      hours: log.hoursRestOvertime,
      icon: Calendar,
    },
    {
      label: 'Regular Holiday Overtime',
      hours: log.hoursRegularHolidayOvertime,
      icon: Star,
    },
    {
      label: 'Special Holiday Overtime',
      hours: log.hoursSpecialHolidayOvertime,
      icon: Star,
    },
    {
      label: 'Double Holiday Overtime',
      hours: log.hoursDoubleHolidayOvertime,
      icon: Star,
    },
  ].filter((item) => item.hours > 0)

  // Group NSD hours
  const nsdHours = [
    { label: 'Regular NSD', hours: log.hoursWorkedNSD },
    { label: 'OIC NSD', hours: log.hoursWorkedOICNSD },
    { label: 'Rest Day NSD', hours: log.hoursRestDayNSD },
    { label: 'Regular Holiday NSD', hours: log.hoursRegularHolidayNSD },
    { label: 'Special Holiday NSD', hours: log.hoursSpecialHolidayNSD },
    { label: 'Double Holiday NSD', hours: log.hoursDoubleHolidayNSD },
  ].filter((item) => item.hours > 0)

  // Group holiday hours
  const holidayHours = [
    {
      label: 'Regular Holiday',
      hours: log.hoursRegularHoliday,
      type: 'regular',
    },
    {
      label: 'Special Holiday',
      hours: log.hoursSpecialHoliday,
      type: 'special',
    },
    { label: 'Double Holiday', hours: log.hoursDoubleHoliday, type: 'double' },
    {
      label: 'Regular Holiday + Rest Day',
      hours: log.hoursRegularHolidayAndRestDay,
      type: 'regular',
    },
    {
      label: 'Special Holiday + Rest Day',
      hours: log.hoursSpecialHolidayAndRestDay,
      type: 'special',
    },
    {
      label: 'Double Holiday + Rest Day',
      hours: log.hoursDoubleHolidayAndRestDay,
      type: 'double',
    },
  ].filter((item) => item.hours > 0)

  return (
    <div className='w-full'>
      <div>
        <div className='mb-4 flex items-center gap-2'>
          <Calendar className='h-5 w-5' />
          {formatDate(log.date)}
        </div>
        <div className='mb-4 flex flex-wrap gap-2'>
          {log.isLeave && <Badge variant='secondary'>Leave</Badge>}
          {log.isHoliday && <Badge variant='outline'>Holiday</Badge>}
          {log.isRestDay && <Badge variant='outline'>Rest Day</Badge>}
          {log.withNSD && <Badge variant='secondary'>NSD</Badge>}
          {log.isCustomSchedule && (
            <Badge variant='outline'>Custom Schedule</Badge>
          )}
          {log.isEmpty && <Badge variant='destructive'>No Schedule</Badge>}
          {log.isError && <Badge variant='destructive'>Error</Badge>}
        </div>
      </div>

      <div>
        <Tabs defaultValue='basic' className='w-full'>
          <TabsList className='mb-4 grid w-full grid-cols-4'>
            <TabsTrigger value='basic'>Basic</TabsTrigger>
            <TabsTrigger value='overtime'>Overtime</TabsTrigger>
            <TabsTrigger value='nsd'>NSD</TabsTrigger>
            <TabsTrigger value='holiday'>Holiday</TabsTrigger>
          </TabsList>

          <TabsContent value='basic' className='space-y-4'>
            {/* Basic Information */}
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {/* Time In */}
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-zinc-900'>
                <div className='mb-1 text-xs text-blue-600 dark:text-blue-400'>
                  Time In
                </div>
                <div className='font-medium text-blue-700 dark:text-blue-300'>
                  {formatTime(log.inTime)}
                </div>
              </div>

              {/* Time Out */}
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-zinc-900'>
                <div className='mb-1 text-xs text-blue-600 dark:text-blue-400'>
                  Time Out
                </div>
                <div className='font-medium text-blue-700 dark:text-blue-300'>
                  {formatTime(log.outTime)}
                </div>
              </div>

              {/* Hours Worked */}
              <div className='rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-zinc-900'>
                <div className='mb-1 text-xs text-green-600 dark:text-green-400'>
                  Hours Worked
                </div>
                <div className='font-medium text-green-700 dark:text-green-300'>
                  {formatHours(log.worked)}
                </div>
              </div>

              {/* Hours Absent */}
              <div className='rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-zinc-900'>
                <div className='mb-1 text-xs text-red-600 dark:text-red-400'>
                  Hours Absent
                </div>
                <div className='font-medium text-red-700 dark:text-red-300'>
                  {formatHours(log.hoursAbsent)}
                </div>
              </div>
            </div>

            {/* Time Adjustments */}
            {(log.late > 0 || log.undertime > 0) && (
              <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-lg border bg-orange-50 p-3'>
                  <div className='mb-1 text-xs text-orange-600'>Late</div>
                  <div className='font-medium'>{formatHours(log.late)}</div>
                </div>
                <div className='rounded-lg border bg-yellow-50 p-3'>
                  <div className='mb-1 text-xs text-yellow-600'>Undertime</div>
                  <div className='font-medium'>
                    {formatHours(log.undertime)}
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            {log.message && (
              <div className='rounded-lg border bg-gray-50 p-3'>
                <div className='mb-1 text-xs text-gray-600'>Message</div>
                <div className='font-medium'>{log.message}</div>
              </div>
            )}
          </TabsContent>

          <TabsContent value='overtime' className='space-y-4'>
            {overtimeHours.length > 0 ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {overtimeHours.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className='rounded-lg border border-purple-200 bg-purple-50 p-3'
                    >
                      <div className='mb-1 flex items-center gap-2'>
                        <Icon className='h-4 w-4 text-purple-600' />
                        <span className='text-xs text-purple-600'>
                          {item.label}
                        </span>
                      </div>
                      <div className='font-medium text-purple-900'>
                        {formatHours(item.hours)}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='py-8 text-center text-gray-500'>
                <AlertTriangle className='mx-auto mb-2 h-8 w-8 opacity-50' />
                <p>No overtime hours recorded</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value='nsd' className='space-y-4'>
            {nsdHours.length > 0 ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {nsdHours.map((item, index) => (
                  <div
                    key={index}
                    className='rounded-lg border border-indigo-200 bg-indigo-50 p-3'
                  >
                    <div className='mb-1 flex items-center gap-2'>
                      <Moon className='h-4 w-4 text-indigo-600' />
                      <span className='text-xs text-indigo-600'>
                        {item.label}
                      </span>
                    </div>
                    <div className='font-medium text-indigo-900'>
                      {formatHours(item.hours)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='py-8 text-center text-gray-500'>
                <Moon className='mx-auto mb-2 h-8 w-8 opacity-50' />
                <p>No night shift differential recorded</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value='holiday' className='space-y-4'>
            {holidayHours.length > 0 ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {holidayHours.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-3 ${
                      item.type === 'regular'
                        ? 'border-yellow-200 bg-yellow-50'
                        : item.type === 'special'
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className='mb-1 flex items-center gap-2'>
                      <Star
                        className={`h-4 w-4 ${
                          item.type === 'regular'
                            ? 'text-yellow-600'
                            : item.type === 'special'
                              ? 'text-green-600'
                              : 'text-red-600'
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          item.type === 'regular'
                            ? 'text-yellow-600'
                            : item.type === 'special'
                              ? 'text-green-600'
                              : 'text-red-600'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div
                      className={`font-medium ${
                        item.type === 'regular'
                          ? 'text-yellow-900'
                          : item.type === 'special'
                            ? 'text-green-900'
                            : 'text-red-900'
                      }`}
                    >
                      {formatHours(item.hours)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='py-8 text-center text-gray-500'>
                <Star className='mx-auto mb-2 h-8 w-8 opacity-50' />
                <p>No holiday hours recorded</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
