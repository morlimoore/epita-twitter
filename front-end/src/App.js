import './styles/App.css';
import SplashScreen from './pages/SplashScreen';
import Profile from './pages/Profile';
import LogoutScreen from './pages/LogoutScreen';
// import SimpleTest from './SimpleTest';

function App() {
  return (
    <div className="App">
      <Profile />
      {/* <SplashScreen /> */}
      {/* <LogoutScreen 
        onCancel={() => console.log('Cancel logout')}
        onConfirmLogout={() => console.log('Confirmed logout')}
      /> */}
    </div>
  );
}

export default App;
