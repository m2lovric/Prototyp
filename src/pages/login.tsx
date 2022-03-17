import React, { useState } from 'react';
import { Layout } from '../components';
import { handleLogin } from '../firebase/functions';
import './signup.scss';

const Signup = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(data.email, data.password);
    setData({ email: '', password: '' });
  };

  return (
    <Layout>
      <section className='signup'>
        <h2 className='signup__title'>Log In</h2>
        <form className='signup__form' onSubmit={handleSubmitForm}>
          <input
            type='text'
            placeholder='Email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type='password'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button>Login</button>
        </form>
      </section>
    </Layout>
  );
};

export default Signup;
