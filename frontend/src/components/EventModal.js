import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

const EventModal = ({ isOpen, onClose, onSubmit, event }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setDate(event.date ? event.date : new Date());
      setEndDate(event.end_date ? event.end_date : new Date());
    } else {
      // Clear values for adding a new event
      setTitle('');
      setDescription('');
      setDate(new Date());
      setEndDate(new Date());
    }
  }, [event, isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) {
        alert("Title is required");
        return;
      }
    onSubmit({ title, description, date, end_date });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white/60 backdrop-blur-lg rounded shadow-lg shadow-slate-200 p-6 w-80 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">{event ? 'Edit Event' : 'Add Event'}</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            value={date ? date.toISOString().slice(0, 16) : ''}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            value={end_date ? end_date.toISOString().slice(0, 16) : ''}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-pink-400 text-white px-4 py-2 rounded mr-2"><FontAwesomeIcon icon={faTimes} className="mr-2" />Cancel</button>
          <button onClick={handleSubmit} className="bg-purple-400 text-white px-4 py-2 rounded"><FontAwesomeIcon icon={faEdit} className="mr-2" />Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
