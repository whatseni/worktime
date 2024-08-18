import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from './store/UserReducer';

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
  //     if (!!user) dispatch(loginUser(user));
  //     else dispatch(logoutUser());
  //   })
  //   return () => unsubscribe();
  // }, [dispatch]);

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
