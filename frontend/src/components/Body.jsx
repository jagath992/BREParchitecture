import React from 'react';

const Body = () => {
  return (
    <div
      className="h-fixed w-full top-100"
      style={{
        backgroundColor: 'rgb(238, 238, 238)',
        color: 'rgba(0, 0, 0, 0.8)',
        marginTop: '92px', // Adjust this value to match the height of your Navbar
      }}
    >
      <p className="text-lg text-gray-800 leading-relaxed px-4">
      We care about creating beautiful architecture, developing projects that are individual, inspiring, and enhancing the lifestyle of users.
      </p>
    </div>
  );
};

export default Body;