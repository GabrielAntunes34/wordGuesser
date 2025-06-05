import React from 'react';

const ErrorMessage = ({ message }) => {
    if(!message || message === '')
        return;

    return (
        <div className='error-message'>
            <p>{message}</p>
        </div>
    )
};

export default ErrorMessage;