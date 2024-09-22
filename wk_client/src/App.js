import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import { useSelector } from 'react-redux';

function App() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App;
