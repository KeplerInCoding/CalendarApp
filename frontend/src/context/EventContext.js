import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [events, setEvents] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Memoize fetchEvents with useCallback to avoid recreating it on each render
  const fetchEvents = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.get(`${API_BASE_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [getAccessTokenSilently, API_BASE_URL]);

  const createEvent = async (eventData) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(`${API_BASE_URL}/events`, eventData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents((prevEvents) => [...prevEvents, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvent = async (id, updatedData) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.put(`${API_BASE_URL}/events/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? { ...event, ...updatedData } : event))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchEvents();
  }, [isAuthenticated, fetchEvents]);

  return (
    <EventContext.Provider value={{ events, createEvent, updateEvent, deleteEvent, fetchEvents }}>
      {children}
    </EventContext.Provider>
  );
};
