// src/components/Admin.js
import React from 'react';
import AddItinerary from './AddItinerary';
import RemoveItinerary from './RemoveItinerary';
import './styles/Admin.module.css';
const Admin = () => {
  return (
    <div>
      <AddItinerary />
      <RemoveItinerary />
    </div>
  );
};

export default Admin;
