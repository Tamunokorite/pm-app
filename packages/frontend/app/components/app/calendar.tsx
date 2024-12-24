import { useState, useMemo } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card } from '../ui/card'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  id: number
  title: string
  start: Date
  end: Date
}

const events: Event[] = [
  {
    id: 1,
    title: 'Project Kickoff',
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 30),
  },
  {
    id: 2,
    title: 'Team Meeting',
    start: new Date(2024, 2, 17, 14, 0),
    end: new Date(2024, 2, 17, 15, 0),
  },
  {
    id: 3,
    title: 'Design Review',
    start: new Date(2024, 2, 20, 13, 0),
    end: new Date(2024, 2, 20, 14, 30),
  },
]

export function Calendar() {
  const [myEvents, setMyEvents] = useState(events)

  const { components, defaultDate, views } = useMemo(() => ({
    components: {
      event: ({ event }: { event: Event }) => (
        <div className="p-1 text-sm">
          <strong>{event.title}</strong>
        </div>
      ),
    },
    defaultDate: new Date(2024, 2, 15),
    views: ['month', 'week', 'day'],
  }), [])

  return (
    <Card className="p-4">
      <BigCalendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
        components={components}
        defaultDate={defaultDate}
        views={views}
      />
    </Card>
  )
}
