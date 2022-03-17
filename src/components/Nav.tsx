import React from 'react';
import { Link } from 'gatsby';

const Nav = () => {
  return (
    <nav className='app__nav'>
      <Link to='/' className='title'>
        _todo_app
      </Link>
      <section className='app__nav__signup'>
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>Login</Link>
      </section>
    </nav>
  );
};

export default Nav;
