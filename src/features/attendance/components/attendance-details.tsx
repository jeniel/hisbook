import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Moon, Star, Calendar, AlertTriangle } from 'lucide-react'
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
        hour12: true
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
      day: 'numeric'
    })
  }

  // Group overtime hours by type
  const overtimeHours = [
    { label: 'Regular Overtime', hours: log.hoursRegularOvertime, icon: Clock },
    { label: 'Rest Day Overtime', hours: log.hoursRestOvertime, icon: Calendar },
    { label: 'Regular Holiday Overtime', hours: log.hoursRegularHolidayOvertime, icon: Star },
    { label: 'Special Holiday Overtime', hours: log.hoursSpecialHolidayOvertime, icon: Star },
    { label: 'Double Holiday Overtime', hours: log.hoursDoubleHolidayOvertime, icon: Star },
  ].filter(item => item.hours > 0)

  // Group NSD hours
  const nsdHours = [
    { label: 'Regular NSD', hours: log.hoursWorkedNSD },
    { label: 'OIC NSD', hours: log.hoursWorkedOICNSD },
    { label: 'Rest Day NSD', hours: log.hoursRestDayNSD },
    { label: 'Regular Holiday NSD', hours: log.hoursRegularHolidayNSD },
    { label: 'Special Holiday NSD', hours: log.hoursSpecialHolidayNSD },
    { label: 'Double Holiday NSD', hours: log.hoursDoubleHolidayNSD },
  ].filter(item => item.hours > 0)

  // Group holiday hours
  const holidayHours = [
    { label: 'Regular Holiday', hours: log.hoursRegularHoliday, type: 'regular' },
    { label: 'Special Holiday', hours: log.hoursSpecialHoliday, type: 'special' },
    { label: 'Double Holiday', hours: log.hoursDoubleHoliday, type: 'double' },
    { label: 'Regular Holiday + Rest Day', hours: log.hoursRegularHolidayAndRestDay, type: 'regular' },
    { label: 'Special Holiday + Rest Day', hours: log.hoursSpecialHolidayAndRestDay, type: 'special' },
    { label: 'Double Holiday + Rest Day', hours: log.hoursDoubleHolidayAndRestDay, type: 'double' },
  ].filter(item => item.hours > 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {formatDate(log.date)}
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          {log.isLeave && <Badge variant="secondary">Leave</Badge>}
          {log.isHoliday && <Badge variant="outline">Holiday</Badge>}
          {log.isRestDay && <Badge variant="outline">Rest Day</Badge>}
          {log.withNSD && <Badge variant="secondary">NSD</Badge>}
          {log.isCustomSchedule && <Badge variant="outline">Custom Schedule</Badge>}
          {log.isEmpty && <Badge variant="destructive">No Schedule</Badge>}
          {log.isError && <Badge variant="destructive">Error</Badge>}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="overtime">Overtime</TabsTrigger>
            <TabsTrigger value="nsd">NSD</TabsTrigger>
            <TabsTrigger value="holiday">Holiday</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg border">
                <div className="text-xs text-blue-600 mb-1">Time In</div>
                <div className="font-medium">{formatTime(log.inTime)}</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border">
                <div className="text-xs text-blue-600 mb-1">Time Out</div>
                <div className="font-medium">{formatTime(log.outTime)}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border">
                <div className="text-xs text-green-600 mb-1">Hours Worked</div>
                <div className="font-medium">{formatHours(log.worked)}</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border">
                <div className="text-xs text-red-600 mb-1">Hours Absent</div>
                <div className="font-medium">{formatHours(log.hoursAbsent)}</div>
              </div>
            </div>

            {/* Time Adjustments */}
            {(log.late > 0 || log.undertime > 0) && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-3 rounded-lg border">
                  <div className="text-xs text-orange-600 mb-1">Late</div>
                  <div className="font-medium">{formatHours(log.late)}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border">
                  <div className="text-xs text-yellow-600 mb-1">Undertime</div>
                  <div className="font-medium">{formatHours(log.undertime)}</div>
                </div>
              </div>
            )}

            {/* Message */}
            {log.message && (
              <div className="bg-gray-50 p-3 rounded-lg border">
                <div className="text-xs text-gray-600 mb-1">Message</div>
                <div className="font-medium">{log.message}</div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="overtime" className="space-y-4">
            {overtimeHours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {overtimeHours.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-purple-600" />
                        <span className="text-xs text-purple-600">{item.label}</span>
                      </div>
                      <div className="font-medium text-purple-900">{formatHours(item.hours)}</div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No overtime hours recorded</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="nsd" className="space-y-4">
            {nsdHours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nsdHours.map((item, index) => (
                  <div key={index} className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Moon className="h-4 w-4 text-indigo-600" />
                      <span className="text-xs text-indigo-600">{item.label}</span>
                    </div>
                    <div className="font-medium text-indigo-900">{formatHours(item.hours)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Moon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No night shift differential recorded</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="holiday" className="space-y-4">
            {holidayHours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {holidayHours.map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    item.type === 'regular' ? 'bg-yellow-50 border-yellow-200' :
                    item.type === 'special' ? 'bg-green-50 border-green-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className={`h-4 w-4 ${
                        item.type === 'regular' ? 'text-yellow-600' :
                        item.type === 'special' ? 'text-green-600' :
                        'text-red-600'
                      }`} />
                      <span className={`text-xs ${
                        item.type === 'regular' ? 'text-yellow-600' :
                        item.type === 'special' ? 'text-green-600' :
                        'text-red-600'
                      }`}>{item.label}</span>
                    </div>
                    <div className={`font-medium ${
                      item.type === 'regular' ? 'text-yellow-900' :
                      item.type === 'special' ? 'text-green-900' :
                      'text-red-900'
                    }`}>{formatHours(item.hours)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No holiday hours recorded</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
