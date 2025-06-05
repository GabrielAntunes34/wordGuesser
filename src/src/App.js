import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/Router';
import { AuthProvider } from './contexts/authContext';
import './App.css';

function App() {
  return (
    <>
        <AuthProvider>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter> 
        </AuthProvider>
    </>
  );
}

export default App;
