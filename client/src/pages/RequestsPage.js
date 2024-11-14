import React, { useEffect, useState } from 'react';
import '../styles/RequestsPage.css';
import apiService from '../services/apiService';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await apiService.fetchUserRequests();
      setRequests(response.data.requests);
    };
    fetchRequests();
  }, []);

  return (
    <div className="requests-container">
      <h2>Your Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id}>
              <p><strong>Book:</strong> {req.book.title}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestsPage;
