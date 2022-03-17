import React, { useState } from 'react';
import { Layout } from '../components';
import './signup.scss';
import { handleCreateUser } from '../firebase/functions';

const Signup = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateUser(data.email, data.password);
    setData({ email: '', password: '' });
  };

  return (
    <Layout>
      <section className='signup'>
        <h2 className='signup__title'>Sign Up</h2>
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
          <button>Signup</button>
        </form>
      </section>
    </Layout>
  );
};

export default Signup;
