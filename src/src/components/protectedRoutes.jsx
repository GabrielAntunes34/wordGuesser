import {Navigate, Outlet} from 'react-router-dom';
import { mkGetUser } from '../tests/userMock.js'

// This is a wrapper component to implement access control for
// the pages' routes in the front end

const ProtectedRoutes = ({ allowedUsers }) => {
    // Pulling our mockup user from localstorage --> should be changed in the future
    const user = mkGetUser('myUser');

    // Case for unlogged clients
    if(!user) {
        return <Navigate to='/login' replace/>;
    }

    // Case for unauthorized access
    if(!allowedUsers.includes(user.role)) {
        return <Navigate to='/' reaplace/>;
    }

    return <Outlet />;
}

export default ProtectedRoutes;