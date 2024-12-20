// src/components/MyCalendar.js
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEventContext } from '../context/EventContext';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from '../components/EventModal';
import EventDetailsModal from '../components/EventDetailsModal';
import './calendar.css'
import { useAuth0 } from '@auth0/auth0-react';


const eventStyleGetter = (event) => {
  let backgroundColor = '#b182e3'; // Default color
  let borderColor = '#8b5cf6'; // Default border color

  // You can conditionally change the color based on event properties
  if (event.type === 'specificType') {
    backgroundColor = '#6d28d9'; // A different shade for specific types
  }

  const style = {
    backgroundColor: backgroundColor,
    border: `1px solid ${borderColor}`,
    color: 'white',
    borderRadius: '5px',
    display: 'block',
  };
  return {
    style: style,
  };
};




const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MyCalendar = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useEventContext();

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const { logout } = useAuth0();

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


  const handleAddEventClick = () => {
    handleSelectSlot({ start: new Date(), end: new Date() });
  };

  return (

    <div className='md:h-11/12 md:w-11/12 ' style={{ position: 'relative', overflow: 'hidden' }}>

      <div className="circle circle1 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full w-80 h-80"></div>
      <div className="circle cirlce2 bg-gradient-to-br from-rose-500 to-slate-500 rounded-full w-80 h-80"></div>


      <Calendar className="backdrop-blur-lg"
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />

      {/* Add Event button */}
      <div className="m-4 flex gap-5">
        <button
          onClick={handleAddEventClick}
          className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Event
        </button>
        <button 
        onClick={() => logout({ returnTo: window.location.origin })} 
        className=" px-4 py-2 bg-pink-400 text-white font-semibold rounded hover:bg-pink-500"
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 " /> Logout
      </button>
      </div>

      
      
      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedEvent(null); // Reset selectedEvent to null
        }} 
        onSubmit={handleSubmitEvent} 
        event={selectedEvent} 
        initialData={initialData} 
      />

      <EventDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedEvent(null); // Reset selectedEvent to null
        }} 
        event={selectedEvent} 
        onEdit={handleEditEvent} 
        onDelete={handleDeleteEvent} 
      />

    </div>
  );
};

export default MyCalendar;
