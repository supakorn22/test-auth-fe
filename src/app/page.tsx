"use client";

import React, { useState, FormEvent } from 'react';
import { registerUser, loginUser, fetchUserInfo, logoutUser } from './libs/api';
import '../styles/global.css'; // Make sure this import is at the top level of your component

const Home = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  async function onSubmitRegister(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await registerUser(formData);
      setMessage(`Registered: ${response.message}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  }

  async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      console.log(formData.get('username'));
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
      console.log(response);
      setMessage(`Fetched user info ${JSON.stringify(response)}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-white mb-8">API Test</h1>
      
      <div className="section">
        <h2 className="section-title">Register</h2>
        <form onSubmit={onSubmitRegister} className="flex flex-col">
          <input
            className="input"
            placeholder="Username"
            required
            name="username"
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            name="password"
          />
          <select
            className="input"
            required
            name="role"
          >
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
          <button
            type="submit"
            className="button"
          >
            Register
          </button>
        </form>
      </div>

      <div className="section">
        <h2 className="section-title">Login</h2>
        <form onSubmit={onSubmitLogin} className="flex flex-col">
          <input
            className="input"
            placeholder="Username"
            required
            name="username"
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            name="password"
          />
          <button
            type="submit"
            className="button"
          >
            Login
          </button>
        </form>
      </div>

      <div className="section">
        <h2 className="section-title">Me</h2>
        <button
          onClick={logout}
          className="button"
        >
          Logout
        </button>
        <button
          onClick={handleFetchUserInfo}
          className="button ml-4"
        >
          Fetch User Info
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Home;
