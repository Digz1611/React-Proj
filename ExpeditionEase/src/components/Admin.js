// src/components/Admin.js
import React from 'react';
import AddBook from './AddBook';
import RemoveBook from './RemoveBook';
import './styles/Admin.module.css';
const Admin = () => {
  return (
    <div>
      <AddBook />
      <RemoveBook />
    </div>
  );
};

export default Admin;
