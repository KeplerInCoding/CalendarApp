import React, { useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useEventContext } from '../context/EventContext';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MyCalendar = () => {
  const { events, createEvent, updateEvent, deleteEvent, fetchEvents } = useEventContext();

  // Fetch events on component mount, add fetchEvents to dependency array
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter a new event title');
    if (title) createEvent({ start, end, title });
  };

  const handleSelectEvent = (event) => {
    const action = prompt('Enter "edit" to update or "delete" to remove the event');
    if (action === 'delete') {
      deleteEvent(event.id);
    } else if (action === 'edit') {
      const newTitle = prompt("Edit event title:", event.title);
      if (newTitle) {
        updateEvent(event.id, { title: newTitle });
      }
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
