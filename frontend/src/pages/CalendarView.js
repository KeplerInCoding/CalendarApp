import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter a new event title');
    if (title) {
      setEvents([...events, { start, end, title }]);
      // Optionally, save event to the backend here
    }
  };

  const handleSelectEvent = (event) => {
    const shouldDelete = window.confirm('Delete this event?');
    if (shouldDelete) {
      setEvents(events.filter(e => e !== event));
      // Optionally, delete event from the backend here
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      style={{ height: 500 }}
    />
  );
};

export default MyCalendar;
