import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminDashboard.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <NavLink to='/projects' onClick={toggleSidebar}>Projects</NavLink>
          <NavLink to='/admindetails'onClick={toggleSidebar}>User Details</NavLink>
          <NavLink to='/addadmin'onClick={toggleSidebar}>Admin Addition</NavLink>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
