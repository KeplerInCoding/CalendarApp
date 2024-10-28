import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [events, setEvents] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch events for the authenticated user
  const fetchEvents = useCallback(async () => {
    if (!isAuthenticated) return; // Exit if not authenticated
    try {
      // const accessToken = await getAccessTokenSilently();

      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: process.env.REACT_APP_AUTH0_AUDIENCE }
      });
      

      const response = await axios.get(`${API_BASE_URL}/events`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Events fetched:', response.data);
      setEvents(response.data); // Set the fetched events directly
    } catch (error) {
      console.error('Error fetching events:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }, [isAuthenticated, getAccessTokenSilently, API_BASE_URL]);

  const createEvent = async (eventData) => {
    if (!isAuthenticated) return; // Exit if not authenticated
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: process.env.REACT_APP_AUTH0_AUDIENCE }
      });
      
      // Transform eventData to match the expected backend structure
      const formattedEventData = {
        title: eventData.title,
        date: eventData.start, // Assuming 'start' is the main event date
        description: eventData.description,
        userId: eventData.userId // Include userId if required
      };
  
      console.log('Event Data to Create:', formattedEventData); // Log the transformed event data
      const res = await axios.post(`${API_BASE_URL}/events`, formattedEventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prevEvents) => [...prevEvents, res.data]);
      await fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };
  
  
  

  const updateEvent = async (id, updatedData) => {
    if (!isAuthenticated) return; // Exit if not authenticated
    try {
      const token = await getAccessTokenSilently({
        audience: API_BASE_URL,
      });
      const res = await axios.put(`${API_BASE_URL}/events/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? { ...event, ...res.data } : event))
      );
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (id) => {
    if (!isAuthenticated) return; // Exit if not authenticated
    try {
      const token = await getAccessTokenSilently({
        audience: API_BASE_URL,
      });
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <EventContext.Provider value={{ events, createEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
