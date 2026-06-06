import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import ToDoList from './components/ToDoList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><ToDoList /></PrivateRoute>} />
        </Routes>
    </>
  );
}

export default App;