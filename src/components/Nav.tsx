import React, { useState } from 'react';
import { Link } from 'gatsby';
import { auth } from '../firebase/config';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

const Nav = () => {
  const [user, setUser] = useState<User>();
  const [logged, setLogged] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setLogged(true);
    } else {
      setLogged(false);
    }
  });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign-out successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className='app__nav'>
      <Link to='/' className='title'>
        _todo_app
      </Link>
      <section className='app__nav__signup'>
        {logged ? (
          <>
            <p className='name'>{user.email.split('@')[0]}</p>
            <button className='signout' onClick={() => handleSignOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </section>
    </nav>
  );
};

export default Nav;
