import { useState } from 'react';
import './MessageForm.css';

function MessageForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const API_PORT = process.env.REACT_APP_API_PORT;
  const API_URL = `http://localhost:${API_PORT}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setMessage('');
      } else {
        const error = await response.json();
        setStatus('Failed to send message: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="message-form-container">
      <h1>Message Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
        />
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default MessageForm;