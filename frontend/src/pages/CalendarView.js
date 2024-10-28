// src/components/MyCalendar.js
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useEventContext } from '../context/EventContext';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from '../components/EventModal';
import EventDetailsModal from '../components/EventDetailsModal';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MyCalendar = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useEventContext();

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setInitialData(null);
    setIsEventModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleSubmitEvent = (eventData) => {
    if (initialData) {
      // Update existing event
      updateEvent(initialData.id, { 
        title: eventData.title, 
        description: eventData.description, 
        date: eventData.date, 
        end_date: eventData.end_date  
      });
    } else {
      // Create new event
      createEvent({ 
        title: eventData.title, 
        description: eventData.description, 
        date: eventData.date, 
        end_date: eventData.end_date 
      });
    }
  };

  const handleEditEvent = () => {
    setInitialData(selectedEvent);
    setIsEventModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleDeleteEvent = () => {
    deleteEvent(selectedEvent.id);
    setIsDetailsModalOpen(false);
    setSelectedEvent(null);
  };

  const mappedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    start: new Date(event.date), // Assuming 'date' is your event date
    end: new Date(event.end_date), // Assuming 'end_date' is your event end date
  }));

  return (
    <>
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
      
      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
        onSubmit={handleSubmitEvent} 
        initialData={initialData} 
      />
      
      <EventDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        event={selectedEvent} 
        onEdit={handleEditEvent} 
        onDelete={handleDeleteEvent} 
      />
    </>
  );
};

export default MyCalendar;
