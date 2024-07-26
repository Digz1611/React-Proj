// src/components/Planner.js
import React from 'react';
import AddItinerary from './AddItinerary';
import RemoveItinerary from './RemoveItinerary';
import './styles/Planner.module.css';
const Planner = () => {
  return (
    <div>
      <AddItinerary />
      <RemoveItinerary />
    </div>
  );
};

export default Planner;
