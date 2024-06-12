"use client"

import React, { useState, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser, loginUser, fetchUserInfo, logoutUser } from './libs/api';
import styled from 'styled-components';

const BlackTextInput = styled.input`
  color: black;
`;

const BlackTextSelect = styled.select`
  color: black;
`;

type registerData = {
  username: string;
  password: string;
  role: string;
};


const Home = () => {

  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);


  async function onSubmitRegister(event: FormEvent<HTMLFormElement>) {

    try {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const response = await registerUser(formData);
      setMessage(`Registered: ${response.message}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    }

  }

  async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {

    try {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      console.log(formData.get('username'))
      const response = await loginUser(formData);
      setMessage(`Logged in: ${response.message}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    }

  }

  const logout = () => {
    try {
      logoutUser();
      setMessage('Logged out');
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  const handleFetchUserInfo = async () => {
    try {
      const response = await fetchUserInfo();
      console.log(response)
      setMessage(`Fetched user info ${JSON.stringify(response)}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div>
      <h1>API Test</h1>

      <h2>Register</h2>
      <form onSubmit={onSubmitRegister}>
        <BlackTextInput placeholder="Username" required name="username" />
        <BlackTextInput type="password" placeholder="Password" required name="password" />
        <BlackTextSelect required name='role'>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="customer">Customer</option>
        </BlackTextSelect>

        <button type="submit">Register</button>
      </form>

      <br />
      <h2>Login</h2>
      <form onSubmit={onSubmitLogin}>
        <BlackTextInput placeholder="Username" required name="username" />
        <BlackTextInput type="password" placeholder="Password" required name="password" />
        <button type="submit">Login</button>
      </form>
      <br />
      <h2>Me</h2>
      <button onClick={logout}>logout</button>
      <br /><br />
      <button onClick={handleFetchUserInfo}>Fetch User Info</button>
      <br /><br />
      {message && <p>{message}</p>}

    </div>
  );
};

export default Home;