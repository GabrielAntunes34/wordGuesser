import React from 'react';
import './LoginPage.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useState } from 'react';

// Form page to log in an already registered user

const LoginPage = () => {
    const { login } = useAuth();
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const success = await login(email, password);
        if(!success) {
            setError('Wrong credentials!');
        }
        else
            Navigate('/manageGuessGame');
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>

            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    name='email'
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    name='password'
                    type='text'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br/>

                <button type='submit'>Submit</button>
            </form>

            <Link to='/signup'>Do not have an account? Sign Up!</Link>
        </div>
    )
};

export default LoginPage;