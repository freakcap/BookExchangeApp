import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AddBookPage from './pages/AddBookPage';
import RequestsPage from './pages/RequestsPage';
import MyRequestsPage from './pages/MyRequestsPage';
import AuthRoute from './pages/AuthRoute'; // Import AuthRoute
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/main"
            element={
              <AuthRoute>
                <MainPage />
              </AuthRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <AuthRoute>
                <AddBookPage />
              </AuthRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <AuthRoute>
                <RequestsPage />
              </AuthRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <AuthRoute>
                <MyRequestsPage />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
