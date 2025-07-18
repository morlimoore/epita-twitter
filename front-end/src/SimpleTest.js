import React from 'react';

function SimpleTest() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🐦 Epita Twitter</h1>
      <p>Frontend is working!</p>
      <button onClick={() => alert('Button clicked!')}>Test Button</button>
    </div>
  );
}

export default SimpleTest;
