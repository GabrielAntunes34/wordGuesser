import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/Router';
import './App.css';

//=======================================
// MOCKS
//=======================================
import { loadMockUser } from './tests/userMock';
loadMockUser();

function App() {
  return (
    <>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter> 
    </>
  );
}

export default App;
