import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RequestsPage.css';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests/user-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
