import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useEventContext } from '../context/EventContext';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MyCalendar = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useEventContext();

  const handleSelectSlot = ({ start }) => {
    const title = prompt('Enter event title');
    const description = prompt('Enter event description');
    if (title && description) {
      // Create an event with the same start and end time
      console.log("start in creating:",start);
      createEvent({ date: start, title, description });
    }
  };

  // Map events to include start and end
  const mappedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    start: new Date(event.date), // Convert string to Date
    end: new Date(event.date),   // Same for end
  }));

  const handleSelectEvent = (event) => {
    const action = prompt('Enter "edit" to update or "delete" to remove the event');
    if (action === 'delete') {
      deleteEvent(event.id);
    } else if (action === 'edit') {
      const newTitle = prompt("Edit event title:", event.title);
      const newDescription = prompt("Edit event description:", event.description);
      if (newTitle && newDescription) {
        updateEvent(event.id, { title: newTitle, description: newDescription });
      }
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={mappedEvents}
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
