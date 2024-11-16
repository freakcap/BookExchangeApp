import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AddBookPage from './components/AddBookForm';
import RequestsPage from './pages/RequestsPage';
import MyRequestsPage from './pages/MyRequestsPage';
import AuthRoute from './pages/AuthRoute'; 
import './App.css';
import Header from './components/Header';
import MyBooksPage from './pages/MyBooksPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <AuthRoute>
                <MainPage />
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
           <Route
            path="/my-books"
            element={
              <AuthRoute>
                <MyBooksPage />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
