// src/components/EventDetailsModal.js
import React from 'react';

const EventDetailsModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
        <p className="mb-2"><strong>Description:</strong> {event.description}</p>
        <p className="mb-2"><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
        <p className="mb-2"><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Close</button>
          <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
