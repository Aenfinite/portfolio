import React from 'react';
import './style.css';

const AirJordan1Page: React.FC = () => {
  return (
    <div className="air-jordan1-container">
      <header className="air-jordan1-header">
        <h1 className="air-jordan1-title">Air Jordan 1</h1>
      </header>
      <main className="air-jordan1-content">
        <div className="air-jordan1-info-section">
          <div className="air-jordan1-image-box">
            <img
              src="/images/air-jordan-1.jpg" // Use the correct public path
              alt="Air Jordan 1"
              className="air-jordan1-image"
            />
          </div>
          <div className="air-jordan1-details">
            <h2>About the Shoe</h2>
            <p>
              The Air Jordan 1 is a timeless sneaker blending legacy and performance.
              Designed by Peter Moore in 1985, it broke the NBA's color rules and sparked a revolution.
            </p>
            <ul>
              <li>Release Year: 1985</li>
              <li>Designer: Peter Moore</li>
              <li>Style: High-top Basketball</li>
              <li>Material: Leather Upper</li>
            </ul>
            <button className="purchase-button">Buy Now</button>
          </div>
        </div>

        <div className="air-jordan1-3dviewer">
          <h2>3D Model Viewer</h2>
          <div className="viewer-placeholder">
            {/* Replace this with a real 3D model viewer like Model-Viewer or Three.js */}
            <p>3D Viewer Coming Soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirJordan1Page;
