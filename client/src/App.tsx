import { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { CurrentUserContext } from './context/userContext';

function App() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
