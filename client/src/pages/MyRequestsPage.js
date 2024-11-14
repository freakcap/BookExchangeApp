import React, { useEffect, useState } from 'react';
import '../styles/MyRequestsPage.css';
import apiService from '../services/apiService';

const MyRequestsPage = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    const fetchIncomingRequests = async () => {
      const response = await apiService.fetchOwnerRequests();
      setIncomingRequests(response.data);
    };
    fetchIncomingRequests();
  }, []);

  const handleRespond = async (requestId, action) => {
    try {
      await apiService.respondToRequest({ requestId, action });
      alert(`Request ${action}ed successfully`);
      window.location.reload(); // Refresh page to show updated status
    } catch (error) {
      alert(`Failed to ${action} request`);
    }
  };

  return (
    <div className="my-requests-container">
      <h2>Incoming Book Requests</h2>
      {incomingRequests.length === 0 ? (
        <p>No incoming requests</p>
      ) : (
        <ul>
          {incomingRequests.map((req) => (
            <li key={req._id}>
              <p><strong>Book:</strong> {req.book.title}</p>
              <p><strong>Requested by:</strong> {req.requester.name}</p>
              <p><strong>Status:</strong> {req.status}</p>
              {req.status === 'Pending' && (
                <div className="actions">
                  <button onClick={() => handleRespond(req._id, 'accept')}>Accept</button>
                  <button onClick={() => handleRespond(req._id, 'decline')}>Decline</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequestsPage;
