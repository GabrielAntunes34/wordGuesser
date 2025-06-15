import { Routes, Route } from 'react-router-dom';

// imports for specific components
//import Layout from '../components/Layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';

// Importing all page components
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import GuessGamePage from '../pages/GuessGamePage';
import ManageGamePage from '../pages/ManageGamePage';


// Keeps the list of routes of our application
const AppRoutes = () => {
	return (
        <Routes>
            <Route path='/'>

                {/* Common pages for visitors */}
                <Route path='' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignUpPage/>}/>
                <Route path='*' element={<NotFoundPage />}/>

                {/* Only logged users can play the games inside the site */}
                <Route element={<ProtectedRoutes allowedUsers={['player']} />}>
                    <Route path='guessGame' element={<GuessGamePage />}/>
                    <Route path='manageGuessGame' element={<ManageGamePage />}/>
                </Route>
            </Route>
        </Routes>

	);
};

export default AppRoutes;
