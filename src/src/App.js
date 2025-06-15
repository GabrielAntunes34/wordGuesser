import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/Router';
import { AuthProvider } from './contexts/authContext';
import './App.css';
import { GameProvider } from './contexts/gameContext';

function App() {
  return (
    <>
        <AuthProvider>
          <GameProvider>
            <BrowserRouter>
              <main>
                <AppRoutes />
              </main>
            </BrowserRouter> 
          </GameProvider>
        </AuthProvider>
    </>
  );
}

export default App;
