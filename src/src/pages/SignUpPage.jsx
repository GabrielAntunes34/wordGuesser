import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useState, useEffect, useContext } from 'react';

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup } = useAuth();
    const navigate = useNavigate();
  
    const onSubmit = (data) => {
        if(signup(data))
            navigate('/');
    }

    return (
        <>
            <h2>Sign up</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label><br/>
                    <input
                    type="email"
                    {...register('email', { 
                        required: 'Email is required', 
                        pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: 'not a valid email'
                        }
                    })}
                    />
                    <br/>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="userName">User name:</label><br/>
                    <input 
                        name='userName'
                        type='text'
                        {...register('userName', { 
                            required: 'user name is required', 
                        })}
                    />
                    <br/>
                    {errors.userName && <p>{errors.userName.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password:</label><br/>
                    <input 
                        name='password'
                        type='password'
                        {...register('password', { 
                            required: 'Password is required', 
                            pattern: {
                            value: /^(?=.*[^A-Za-z0-9])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                            message: 'Passwords have at least 6 characters with symbols, numbers and capital letters.'
                            }
                        })}
                    />
                    <br/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type='submit'>Register</button>
            </form>
        </>
    )
};

export default SignUpPage;