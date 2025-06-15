import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import './NavBar.css';
//import logo from '../../public/arcanet.png';


const NavBar = () => {
    const {use, logout} = useAuth();


    // Função para ser chamada pelo ProfileDropdown após o logout
    const handleLogoutInNavBar = () => {
        logout();
    };


    return (
        <div className='navbar'>
            {/* Esquerda da navbar */}
            <div className='navbar-brand'>
                <Link to="/" className='navbar-brand-name'><h1>WordGuesser</h1></Link>
            </div>
        </div>
    );
};

export default NavBar;