import React from 'react';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <main className='app'>
      <Nav />
      {children}
    </main>
  );
};

export default Layout;
