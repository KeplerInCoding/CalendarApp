// src/components/EventModal.js
import React, { useState, useEffect } from 'react';

const EventModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setStart] = useState(new Date());
  const [end_date, setEnd] = useState(new Date());

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStart(new Date(initialData.date));
      setEnd(new Date(initialData.end_date));
    } else {
      setTitle('');
      setDescription('');
      setStart(new Date());
      setEnd(new Date());
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSubmit({ title, description, date, end_date });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Event' : 'Add Event'}</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
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
            value={date.toISOString().slice(0, 16)}
            onChange={(e) => setStart(new Date(e.target.value))}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            value={end_date.toISOString().slice(0, 16)}
            onChange={(e) => setEnd(new Date(e.target.value))}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
