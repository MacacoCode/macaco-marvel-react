import React from 'react';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
        <h1>Welcome to Macaco&apos;s Marvel App!</h1>
        <SpidermanAnimation />
    </div>
  );
}

export default HomePage;
