import React,{useState} from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function RootLayout(){

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return(

    <>
      <div className="navbar">
        <div className="hamburger" onClick={toggleSidebar}> &#9776; </div>
        <div className="admin-info">
            <span>Hi Admin</span>
            <button className="logout-btn">Logout</button>
        </div>
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main>
        <Outlet />
      </main>
    </>

  );
}