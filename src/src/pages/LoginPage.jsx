import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import ErrorMessage from '../components/ErrorMessage';
import { useState, useEffect, useContext } from 'react';

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
            Navigate('/');
    }

    return (
        <>
            <h2>Login</h2>

            <ErrorMessage message={error}/>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br/>
                <input 
                    name='email'
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <br/>

                <label htmlFor="password">Password:</label><br/>
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
        </>
    )
};

export default LoginPage;