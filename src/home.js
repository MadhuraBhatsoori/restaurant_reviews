import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Ensure to import your CSS file

const Home = () => {
  return (
    <div className="container-home home-background"> {/* Apply the new class here */}
      <div className="content-home">
        <h1 className="title">DINE HUB</h1>
        <p className="description">Chat directly with reviews to find top dishes</p>
        <p className="description">and instant insights from real customer experiences.</p>
        <Link to="/app" className="chat-button"> 
          Chat Now
        </Link>
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Home;
