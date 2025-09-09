import {
  Clock,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  Coffee,
  Eye,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AttendanceData, HisUser, AttendanceLog } from '../hooks/useAttendance'
import { AttendanceDetails } from './attendance-details'

interface AttendanceCardProps {
  attendanceData: AttendanceData
  periodLabel: string
  employee: HisUser
}

export function AttendanceCard({
  attendanceData,
  periodLabel,
  employee,
}: AttendanceCardProps) {
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

  // Calculate summary statistics
  const calculateSummary = () => {
    if (!attendanceData.logs)
      return { totalWorked: 0, daysPresent: 0, daysAbsent: 0, totalLate: 0 }

    const totalWorked = attendanceData.logs.reduce(
      (sum, log) => sum + log.worked,
      0
    )
    const daysPresent = attendanceData.logs.filter(
      (log) => !log.isEmpty && log.worked > 0
    ).length
    const totalNoWork = attendanceData.logs.filter(
      (log) => log.isEmpty || log.hoursAbsent > 0
    ).length
    const totalLate = attendanceData.logs.reduce(
      (sum, log) => sum + log.late,
      0
    )
    const restDays = attendanceData.logs.filter((log) => log.isRestDay).length
    const daysAbsent = (totalNoWork - 1)

    return { totalWorked, daysPresent, daysAbsent, totalLate, restDays }
  }

  const summary = calculateSummary()

  const getStatusBadge = (log: AttendanceLog) => {
    if (log.isLeave) return <Badge variant='secondary'>Leave</Badge>
    if (log.isHoliday) return <Badge variant='outline'>Holiday</Badge>
    if (log.isRestDay) return <Badge variant='outline'>Rest Day</Badge>
    if (log.isEmpty) return <Badge variant='destructive'>No Schedule</Badge>
    if (log.isError) return <Badge variant='destructive'>Error</Badge>
    if (log.worked > 0) return <Badge variant='default'>Present</Badge>
    return <Badge variant='secondary'>Absent</Badge>
  }

  const getStatusIcon = (log: AttendanceLog) => {
    if (log.isLeave || log.isHoliday || log.isRestDay)
      return <Coffee className='h-4 w-4 text-blue-500' />
    if (log.isEmpty || log.isError)
      return <XCircle className='h-4 w-4 text-red-500' />
    if (log.worked > 0)
      return <CheckCircle className='h-4 w-4 text-green-500' />
    return <AlertCircle className='h-4 w-4 text-orange-500' />
  }

  return (
    <Card className='w-full'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-lg'>
            <Calendar className='h-5 w-5 text-blue-600' />
            Attendance Summary
          </CardTitle>
          <Badge variant='outline' className='text-xs'>
            {periodLabel}
          </Badge>
        </div>
        <div className='text-sm text-gray-600'>
          <p className='font-medium'>{employee.fullName}</p>
          <p>Department: {employee.department.departmentName}</p>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Summary Stats */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
          <div className='rounded-lg border border-blue-200 bg-blue-50 p-3'>
            <div className='mb-1 flex items-center gap-2'>
              <Clock className='h-4 w-4 text-blue-600' />
              <span className='text-xs font-medium text-blue-800'>
                Total Hours
              </span>
            </div>
            <div className='text-lg font-bold text-blue-900'>
              {formatHours(summary.totalWorked)}
            </div>
          </div>

          <div className='rounded-lg border border-green-200 bg-green-50 p-3'>
            <div className='mb-1 flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-green-600' />
              <span className='text-xs font-medium text-green-800'>
                Days Present
              </span>
            </div>
            <div className='text-lg font-bold text-green-900'>
              {summary.daysPresent}
            </div>
          </div>

          <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
            <div className='mb-1 flex items-center gap-2'>
              <XCircle className='h-4 w-4 text-red-600' />
              <span className='text-xs font-medium text-red-800'>
                Days Absent
              </span>
            </div>
            <div className='text-lg font-bold text-red-900'>
              {summary.daysAbsent}
            </div>
          </div>

          <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
            <div className='mb-1 flex items-center gap-2'>
              <XCircle className='h-4 w-4 text-red-600' />
              <span className='text-xs font-medium text-red-800'>
                Rest Days
              </span>
            </div>
            <div className='text-lg font-bold text-red-900'>
              {summary.restDays}
            </div>
          </div>

          <div className='rounded-lg border border-orange-200 bg-orange-50 p-3'>
            <div className='mb-1 flex items-center gap-2'>
              <AlertCircle className='h-4 w-4 text-orange-600' />
              <span className='text-xs font-medium text-orange-800'>
                Late Hours
              </span>
            </div>
            <div className='text-lg font-bold text-orange-900'>
              {formatHours(summary.totalLate)}
            </div>
          </div>
        </div>

        {/* Attendance Logs */}
        {attendanceData.logs && attendanceData.logs.length > 0 && (
          <div>
            <h4 className='mb-3 flex items-center gap-2 font-medium text-gray-900'>
              <Users className='h-4 w-4' />
              Daily Attendance Records ({attendanceData.logs.length} entries)
            </h4>
            <div className='max-h-96 space-y-2 overflow-y-auto'>
              {attendanceData.logs.map((log, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-lg border bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                >
                  <div className='flex flex-1 items-center gap-3'>
                    {getStatusIcon(log)}
                    <div>
                      <div className='text-sm font-medium'>
                        {new Date(log.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className='text-xs text-gray-600'>
                        {log.inTime || log.outTime ? (
                          <>
                            In: {formatTime(log.inTime)} • Out:{' '}
                            {formatTime(log.outTime)}
                          </>
                        ) : (
                          <span className='text-gray-500'>{log.message}</span>
                        )}
                      </div>
                      {log.late > 0 && (
                        <div className='text-xs text-orange-600'>
                          Late: {formatHours(log.late)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col items-end gap-1 text-right'>
                    <div className='text-sm font-medium'>
                      {formatHours(log.worked)}
                    </div>
                    <div className='flex flex-wrap gap-1'>
                      {getStatusBadge(log)}
                      {log.withNSD && (
                        <Badge variant='outline' className='text-xs'>
                          NSD: {formatHours(log.hoursWorkedNSD)}
                        </Badge>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant='outline' size='sm' className='mt-1'>
                          <Eye className='mr-1 h-3 w-3' />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
                        <AttendanceDetails log={log} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!attendanceData.logs || attendanceData.logs.length === 0) && (
          <div className='py-8 text-center text-gray-500'>
            <Calendar className='mx-auto mb-3 h-12 w-12 opacity-50' />
            <p className='font-medium'>No attendance records found</p>
            <p className='text-sm'>for the selected period</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
