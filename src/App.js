import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    if (inputValue) {
      setIsLoading(true);
      try {
        // You can add an API endpoint to verify restaurant existence if needed
        setRestaurantName(inputValue);
        setInputValue('');
      } catch (error) {
        console.error('Error sending query:', error);
        alert('Error searching for restaurant. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please enter a restaurant name.');
    }
  };

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setIsChatLoading(true);
      // Add user message immediately
      const userMessageObj = { text: userMessage, sender: 'user' };
      setChatMessages(prevMessages => [...prevMessages, userMessageObj]);
      
      try {
        // Construct the query with restaurant context
        const queryWithContext = `About ${restaurantName}: ${userMessage}`;
        
        const response = await axios.post('http://localhost:5000/api/query', {
          query: queryWithContext // Changed from 'message' to 'query' to match backend
        });

        // Add bot response
        if (response.data.result) {
          setChatMessages(prevMessages => [
            ...prevMessages,
            { text: response.data.result, sender: 'bot' }
          ]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setChatMessages(prevMessages => [
          ...prevMessages,
          { text: 'Sorry, there was an error processing your request.', sender: 'bot' }
        ]);
      } finally {
        setUserMessage('');
        setIsChatLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dine Hub</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter restaurant name"
          style={styles.input}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          style={styles.sendButton} 
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {restaurantName && (
        <div style={styles.restaurantContainer}>
          <h2 style={styles.restaurantName}>Restaurant: {restaurantName}</h2>
          <button 
            style={styles.chatButton} 
            onClick={() => setIsModalOpen(true)}
          >
            Chat Now
          </button>
        </div>
      )}

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalHeader}>
            Welcome to the chat with {restaurantName} reviews. Type your question below!
            </h3>
            <div style={styles.chatArea}>
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={userMessage}
                onChange={handleUserMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the restaurant..."
                style={styles.messageInput}
                disabled={isChatLoading}
              />
              <button 
                style={{
                  ...styles.sendButton,
                  opacity: isChatLoading ? 0.7 : 1
                }} 
                onClick={handleSendMessage}
                disabled={isChatLoading}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            <button 
              style={styles.closeButton} 
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginTop: '50px',
    color: '#354128',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    marginTop: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#354128',
    color: 'white',
    transition: 'background-color 0.3s ease',
    display: 'flex', // Flex for alignment
    alignItems: 'center', // Center icon vertically
  },
  restaurantContainer: {
    marginTop: '50px',
    padding: '15px',
    backgroundColor: '#e6e6e8', // Light gray for found restaurant
    borderRadius: '5px',
    display: 'flex', // Use flexbox to align items
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space between restaurant name and button
  },
  restaurantName: {
    margin: '0', // Remove default margin
    fontSize: '1.5rem',
  },
  chatButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#354128',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  chatArea: {
    maxHeight: '300px',
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  userMessage: {
    textAlign: 'right',
    padding: '10px',
    backgroundColor: '#6f876b',
    borderRadius: '15px',
    marginBottom: '5px',
    margin: '5px',
  },
  botMessage: {
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#e6e6e8',
    borderRadius: '15px',
    marginBottom: '5px',
  },
  messageInput: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',  
    textAlign: 'center',
    display: 'flex',  
    flexDirection: 'column',  
    alignItems: 'center',  
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#354128',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '20%',  
    textAlign: 'center',  
    display: 'flex', 
    justifyContent: 'center',  
    alignItems: 'center',  
  },
};

export default App;
