import React, { useState } from 'react';
import './App.css';
import SplashScreen from './pages/SplashScreen';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleAuthenticated = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <SplashScreen onAuthenticated={handleAuthenticated} />
      )}
    </div>
  );
}

export default App;
