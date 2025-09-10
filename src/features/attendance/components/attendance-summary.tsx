import { Clock, Star, Calendar, TrendingUp, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AttendanceData } from '../hooks/useAttendance'

interface AttendanceSummaryProps {
  attendanceData: AttendanceData
  periodLabel: string
}

export function AttendanceSummary({
  attendanceData,
  periodLabel,
}: AttendanceSummaryProps) {
  const formatHours = (hours: number) => {
    if (hours === 0) return '0h'
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`
  }

  // Calculate comprehensive summary from all logs
  const calculateSummary = () => {
    if (!attendanceData.logs) return null

    const summary = attendanceData.logs.reduce(
      (acc, log) => {
        return {
          totalWorked: acc.totalWorked + log.worked,
          totalLate: acc.totalLate + log.late,
          totalUndertime: acc.totalUndertime + log.undertime,
          totalAbsent: acc.totalAbsent + log.hoursAbsent,

          // Regular hours
          regularOvertime: acc.regularOvertime + log.hoursRegularOvertime,

          // NSD hours
          totalNSD:
            acc.totalNSD +
            log.hoursWorkedNSD +
            log.hoursWorkedOICNSD +
            log.hoursRestDayNSD +
            log.hoursRegularHolidayNSD +
            log.hoursSpecialHolidayNSD +
            log.hoursDoubleHolidayNSD,

          // Holiday hours
          regularHoliday:
            acc.regularHoliday +
            log.hoursRegularHoliday +
            log.hoursRegularHolidayAndRestDay,
          specialHoliday:
            acc.specialHoliday +
            log.hoursSpecialHoliday +
            log.hoursSpecialHolidayAndRestDay,
          doubleHoliday:
            acc.doubleHoliday +
            log.hoursDoubleHoliday +
            log.hoursDoubleHolidayAndRestDay,

          // Rest day hours
          restDay: acc.restDay + log.hoursRestDay,

          // OIC hours
          oicHours:
            acc.oicHours +
            log.workedOIC +
            log.hoursRegularOICOvertime +
            log.hoursDoubleHolidayOIC +
            log.hoursRegularHolidayOIC +
            log.hoursSpecialHolidayOIC,

          // All overtime
          totalOvertime:
            acc.totalOvertime +
            log.hoursRegularOvertime +
            log.hoursRestOvertime +
            log.hoursRegularHolidayOvertime +
            log.hoursSpecialHolidayOvertime +
            log.hoursDoubleHolidayOvertime +
            log.hoursRegularHolidayAndRestDayOvertime +
            log.hoursSpecialHolidayAndRestDayOvertime +
            log.hoursDoubleHolidayAndRestDayOvertime,

          // Day counts
          daysPresent: log.worked > 0 ? acc.daysPresent + 1 : acc.daysPresent,
          daysAbsent:
            log.isEmpty || log.hoursAbsent > 0
              ? acc.daysAbsent + 1
              : acc.daysAbsent,
          daysLeave: log.isLeave ? acc.daysLeave + 1 : acc.daysLeave,
          daysHoliday: log.isHoliday ? acc.daysHoliday + 1 : acc.daysHoliday,
          daysRestDay: log.isRestDay ? acc.daysRestDay + 1 : acc.daysRestDay,
          daysLate: log.late > 0 ? acc.daysLate + 1 : acc.daysLate,
        }
      },
      {
        totalWorked: 0,
        totalLate: 0,
        totalUndertime: 0,
        totalAbsent: 0,
        regularOvertime: 0,
        totalNSD: 0,
        regularHoliday: 0,
        specialHoliday: 0,
        doubleHoliday: 0,
        restDay: 0,
        oicHours: 0,
        totalOvertime: 0,
        daysPresent: 0,
        daysAbsent: 0,
        daysLeave: 0,
        daysHoliday: 0,
        daysRestDay: 0,
        daysLate: 0,
      }
    )

    const totalDays = attendanceData.logs.length
    const workingDays =
      totalDays - summary.daysHoliday - summary.daysRestDay - summary.daysLeave
    const attendanceRate =
      workingDays > 0 ? (summary.daysPresent / workingDays) * 100 : 0

    return { ...summary, totalDays, workingDays, attendanceRate }
  }

  const summary = calculateSummary()

  if (!summary) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='text-center text-gray-500'>
            <AlertTriangle className='mx-auto mb-2 h-8 w-8 opacity-50' />
            <p>No attendance data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Main Overview */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <TrendingUp className='h-8 w-8 text-red-500' />
            <p className='text-xl'>Attendance Overview - {periodLabel}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {summary.daysPresent}
              </div>
              <div className='text-sm text-gray-600'>Days Present</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {formatHours(summary.totalWorked)}
              </div>
              <div className='text-sm text-gray-600'>Total Worked</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                {formatHours(summary.totalOvertime)}
              </div>
              <div className='text-sm text-gray-600'>Total Overtime</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                {summary.attendanceRate.toFixed(1)}%
              </div>
              <div className='text-sm text-gray-600'>Attendance Rate</div>
            </div>
          </div>

          {/* Attendance Rate Progress */}
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Attendance Rate</span>
              <span>{summary.attendanceRate.toFixed(1)}%</span>
            </div>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-blue-600 transition-all duration-300'
                style={{ width: `${Math.min(summary.attendanceRate, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Regular Hours */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-sm'>
              <Clock className='h-4 w-4 text-blue-600' />
              Regular Hours
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm'>Worked</span>
              <Badge variant='outline'>
                {formatHours(summary.totalWorked)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Late</span>
              <Badge
                variant={summary.totalLate > 0 ? 'destructive' : 'outline'}
              >
                {formatHours(summary.totalLate)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Undertime</span>
              <Badge
                variant={summary.totalUndertime > 0 ? 'destructive' : 'outline'}
              >
                {formatHours(summary.totalUndertime)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Absent</span>
              <Badge
                variant={summary.totalAbsent > 0 ? 'destructive' : 'outline'}
              >
                {formatHours(summary.totalAbsent)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Special Hours */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-sm'>
              <Star className='h-4 w-4 text-yellow-600' />
              Special Hours
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm'>Overtime</span>
              <Badge
                variant={summary.totalOvertime > 0 ? 'default' : 'outline'}
              >
                {formatHours(summary.totalOvertime)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>NSD</span>
              <Badge variant={summary.totalNSD > 0 ? 'secondary' : 'outline'}>
                {formatHours(summary.totalNSD)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Rest Day</span>
              <Badge variant={summary.restDay > 0 ? 'secondary' : 'outline'}>
                {formatHours(summary.restDay)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>OIC</span>
              <Badge variant={summary.oicHours > 0 ? 'default' : 'outline'}>
                {formatHours(summary.oicHours)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Holiday Hours */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-sm'>
              <Calendar className='h-4 w-4 text-green-600' />
              Holiday Hours
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm'>Regular Holiday</span>
              <Badge
                variant={summary.regularHoliday > 0 ? 'default' : 'outline'}
              >
                {formatHours(summary.regularHoliday)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Special Holiday</span>
              <Badge
                variant={summary.specialHoliday > 0 ? 'secondary' : 'outline'}
              >
                {formatHours(summary.specialHoliday)}
              </Badge>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Double Holiday</span>
              <Badge
                variant={summary.doubleHoliday > 0 ? 'destructive' : 'outline'}
              >
                {formatHours(summary.doubleHoliday)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Day Counts */}
        <Card className='md:col-span-2 lg:col-span-3 mb-4'>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-sm'>
              <Calendar className='h-4 w-4 text-purple-600' />
              Day Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7'>
              <div className='text-center'>
                <div className='text-lg font-bold text-blue-600'>
                  {summary.totalDays}
                </div>
                <div className='text-xs text-gray-600'>Total Days</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-green-600'>
                  {summary.daysPresent}
                </div>
                <div className='text-xs text-gray-600'>Present</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-red-600'>
                  {summary.daysAbsent}
                </div>
                <div className='text-xs text-gray-600'>Absent</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-orange-600'>
                  {summary.daysLate}
                </div>
                <div className='text-xs text-gray-600'>Late</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-purple-600'>
                  {summary.daysLeave}
                </div>
                <div className='text-xs text-gray-600'>Leave</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-yellow-600'>
                  {summary.daysHoliday}
                </div>
                <div className='text-xs text-gray-600'>Holiday</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-gray-600'>
                  {summary.daysRestDay}
                </div>
                <div className='text-xs text-gray-600'>Rest Day</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
