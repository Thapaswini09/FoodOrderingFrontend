import React, { useEffect, useState } from 'react';
import '../css/Home.css';

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="admin-home-container">
      <div className={`admin-card ${fadeIn ? 'fade-in' : ''}`}>
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Food"
          className="admin-image"
        />
        <div className="admin-text">
          <h1 className="animated-heading">Welcome, Admin!</h1>
          <p className="animated-paragraph">
            Your dashboard provides everything to keep your restaurant running smoothly. 
            From managing items to tracking orders — it’s all here!
          </p>
          <p>
            Navigate through the top menu to add new dishes, monitor live orders, 
            and keep your food list up-to-date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
